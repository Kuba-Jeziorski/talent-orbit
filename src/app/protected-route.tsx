export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // check if there is a user authenticated
  // if no --> redirect to the /login page
  // if yes --> return <>{children}</>
  return <div data-component="protected">{children}</div>;
};
