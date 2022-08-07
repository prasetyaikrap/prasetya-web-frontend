import st from "styles/admin.module.css";
import { storage, firestore } from "./firebaseConfig";
import {
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  FieldValue,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import generateRandom from "./generateRandomToken";

//Login and Logout Handler
export async function handleLogin(
  event,
  setLoading,
  setIsAlert,
  setErrMessage,
  router,
  login
) {
  event.preventDefault();
  const form = document.getElementById(event.currentTarget.id);
  setLoading(true);
  setIsAlert(false);
  const result = await login(
    form.querySelector("#email").value,
    form.querySelector("#password").value
  );
  switch (result.status) {
    case "OK":
      setLoading(false);
      router.push("/admin/dashboard");
      break;
    case "auth/wrong-password":
      setLoading(false);
      setIsAlert(true);
      setErrMessage("wrong email or password. Please try again");
      break;
    case "auth/user-not-found":
      setLoading(false);
      setIsAlert(true);
      setErrMessage("User Not Found. Please try again");
      break;
    case "auth/too-many-requests":
      setLoading(false);
      setIsAlert(true);
      setErrMessage(
        "Oops... too many failed attempts... please try again in 5 minutes"
      );
      break;
    default:
  }
  console.clear();
}
//Project Panel
export function openProject(action, setOpenState) {
  //Open Project Preview
  setOpenState(action);
  if (action == "EDIT") {
    const thumbnailPreview = document.getElementById("thumbnailPreview");
    thumbnailPreview.classList.add(st.thumbnailUploaded);
  }
  const pvElement = document.getElementById("projectView");
  pvElement.classList.add(st.pvContainerOpen);
}
export async function projectOnSave(
  targetId,
  viewState,
  setSaveLoading,
  setSaveMsg,
  setUploadError,
  setSelectedProjectId,
  oldThumbnail
) {
  //Processing State
  const [openState, setOpenState] = viewState;
  const form = document.getElementById(targetId);
  const smId = document.getElementById("saveMsg");
  const thumbnailPreview = document.getElementById("thumbnailPreview");
  const blobImg = form.querySelector("#pvUploadImage").files[0];
  const projectId = document
    .getElementById(targetId)
    .getAttribute("data-projectid");
  setSaveLoading(true);
  smId.classList.add(st.loadingMsg);
  smId.classList.remove(st.errorMsg);
  setSaveMsg("Loading...");
  //Generate Tags
  const tagsGenerated = form
    .querySelector("#tags")
    .value.split(",")
    .map((item) => {
      return item.trim();
    })
    .slice(0, 3);
  //Array Search
  const arraySearch = form
    .querySelector("#title")
    .value.toLowerCase()
    .split(" ")
    .filter((item) => {
      return item != "";
    });
  //Upload Image Function
  const uploadImg = async () => {
    const uploadTask = await uploadBytes(
      ref(storage, `images/img_project${generateRandom(6)}`),
      blobImg
    );
    const imageUrl = await getDownloadURL(uploadTask.ref);
    return imageUrl;
  };
  //Data Scheme
  try {
    //Populate Data
    const data = {
      title: form.querySelector("#title").value,
      description: form.querySelector("#description").value,
      author: "Prasetya Ikra Priyadi",
      categoryId: form.querySelector("#setCategory").value,
      categoryName:
        form.querySelector("#setCategory").options[
          form.querySelector("#setCategory").selectedIndex
        ].text,
      btnLink: [
        {
          name: form.querySelector("#btnName1").value,
          url: form.querySelector("#btnLink1").value,
        },
        {
          name: form.querySelector("#btnName2").value,
          url: form.querySelector("#btnLink2").value,
        },
      ],
      isFeatured: form.querySelector("#setFeatured").value,
      isPublic: form.querySelector("#setVisibility").value,
      arraySearch: arraySearch,
    };

    //Add to Firestore
    if (openState == "CREATE") {
      //Upload Image
      if (blobImg == undefined) {
        throw "Thumbnail image is required";
      }
      data.tags = tagsGenerated;
      data.imageUrl = await uploadImg();
      data.createdAt = serverTimestamp();
      data.updatedAt = serverTimestamp();
      await addDoc(collection(firestore, "projects"), data);
    }
    if (openState == "EDIT") {
      //Upload Image
      if (blobImg && oldThumbnail) {
        await deleteObject(ref(storage, oldThumbnail));
        data.imageUrl = await uploadImg();
      }
      data.tags = tagsGenerated;
      data.updatedAt = serverTimestamp();
      await setDoc(doc(firestore, "projects", projectId), data, {
        merge: true,
      });
    }
    //Cleanup
    setSaveMsg("Saving complete... Cleaning up...");
    setTimeout(() => {
      form.reset();
      form.classList.remove(st.pvContainerOpen);
      thumbnailPreview.classList.remove(st.thumbnailUploaded);
      smId.classList.remove(st.loadingMsg);
      smId.classList.remove(st.errorMsg);
      form.querySelector("#imgThumbnail").src = "/assets/imgUnavailable.jpeg";
      setOpenState(null);
      setUploadError("");
      setSaveMsg("");
      setSaveLoading(false);
      setSelectedProjectId(null);
    }, 3000);
  } catch (err) {
    setSaveMsg("Something Went Wrong... " + err);
    setSaveLoading(false);
    smId.classList.remove(st.loadingMsg);
    smId.classList.add(st.errorMsg);
  }
}
export function projectOnCancel(setOpenState, setUploadError) {
  const form = document.getElementById("projectView");
  const thumbnailPreview = document.getElementById("thumbnailPreview");
  form.reset();
  form.classList.remove(st.pvContainerOpen);
  thumbnailPreview.classList.remove(st.thumbnailUploaded);
  setOpenState(null);
  form.querySelector("#imgThumbnail").src = "/assets/imgUnavailable.jpeg";
  setUploadError("");
}
export function uploadThumbnailOnChange(targetId, setUploadError) {
  const image = document.getElementById(targetId).files[0];
  const thumbnailPreview = document.getElementById("thumbnailPreview");
  const reader = new FileReader();
  switch (true) {
    case image.size > 1024 * 1000:
      setUploadError("Upload failed. Image size is over 1mb");
      form.querySelector("#imgThumbnail").src = "/assets/imgUnavailable.jpeg";
      thumbnailPreview.classList.remove(st.thumbnailUploaded);
      document.getElementById(targetId).value = null;
      break;
    case image.type.slice(0, 5) != "image":
      setUploadError("Upload failed. Image type is invalid");
      form.querySelector("#imgThumbnail").src = "/assets/imgUnavailable.jpeg";
      thumbnailPreview.classList.remove(st.thumbnailUploaded);
      document.getElementById(targetId).value = null;
      break;
    default:
      reader.readAsDataURL(image);
      reader.onload = () => {
        setUploadError("");
        form.querySelector("#imgThumbnail").src = reader.result;
        thumbnailPreview.classList.add(st.thumbnailUploaded);
      };
  }
}
export function getProjectList(routerQuery, dataState, visibleState) {
  const [data, setData] = dataState;
  const [lastVisible, setLastVisible] = visibleState;
  if (!routerQuery) {
    const queryRef = query(
      collection(firestore, "projects"),
      orderBy("createdAt"),
      limit(5)
    );
    const unsub = onSnapshot(
      queryRef,
      { includeMetadataChanges: true },
      (snapshot) => {
        let docData = [];
        if (!snapshot.metadata.hasPendingWrites) {
          snapshot.forEach((doc) => {
            docData.push({ id: doc.id, data: doc.data() });
          });
          setData(docData);
        }
      }
    );
  } else {
    let docData = [];
    const arrayQuery = routerQuery
      .split(" ")
      .splice(0, 5)
      .filter((item) => {
        return item != "";
      });
    const queryRef = query(
      collection(firestore, "projects"),
      where("arraySearch", "array-contains-any", arrayQuery)
    );
    const unsub = onSnapshot(
      queryRef,
      { includeMetadataChanges: true },
      (snapshot) => {
        let docData = [];
        if (!snapshot.metadata.hasPendingWrites) {
          snapshot.forEach((doc) => {
            docData.push({ id: doc.id, data: doc.data() });
          });
          setData(docData);
        }
      }
    );
  }
}
