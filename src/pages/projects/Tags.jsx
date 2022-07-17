
export default function Tags({tagsData}) {
  const dataDummy = [1,2,3,4,5];
  const tags = dataDummy.map(item => {
    return (
      <span key={item} id={"tags"+item} className={`smallText`}>Tags {item}</span>
    )
  })
  return tags
}