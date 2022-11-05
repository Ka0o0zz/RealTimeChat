import errorImg from "@assets/error-404.svg";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Sorry, page not found!</h1>
      <p>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling..
      </p>
      <img src={errorImg} alt="error 404" />
    </div>
  );
};

export default ErrorPage;
