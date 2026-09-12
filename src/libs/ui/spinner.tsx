export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-tma-light-400/40">
      <div className="w-12 h-12 border-4 border-tma-blue-200 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
