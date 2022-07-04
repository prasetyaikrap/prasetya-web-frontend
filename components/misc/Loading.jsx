import st from '../styles/misc.module.css';

export default function Loading() {
  return (
    <div className={`${st.loadingContainer}`}>
      <div className={`${st.loadingRoll}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}