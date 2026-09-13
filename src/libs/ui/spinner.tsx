export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="w-12 h-12 border-4 border-accent-brand border-t-transparent rounded-full animate-spin" />
    </div>
  );
};