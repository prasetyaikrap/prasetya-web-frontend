export default function TestButton({handler, position, name}) {
  return (
    <button style={{position: "fixed", top: position.top, left: position.left, zIndex:"99"}} onClick={handler}>
      {name}
    </button>
  )
}