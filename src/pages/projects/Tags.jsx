export default function Tags({ data }) {
  const tags = data.map((item) => {
    return (
      <span key={item} id={"tags" + item} className={`smallText`}>
        {item}
      </span>
    );
  });
  return tags;
}
