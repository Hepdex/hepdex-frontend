import preloaderStyles from "../styles/PreloaderStyles.module.css";

const Preloader = () => {
  return (
    <div className={preloaderStyles.loaderBox}>
      <div className={preloaderStyles.loader}>Loading...</div>
    </div>
  );
};
export default Preloader;
