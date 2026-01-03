import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error); // logs the error in console for debugging

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>😅 Oops! Something went wrong.</h1>
      <p>{error?.statusText || error?.message || "Unknown error"}</p>
    </div>
  );
}

