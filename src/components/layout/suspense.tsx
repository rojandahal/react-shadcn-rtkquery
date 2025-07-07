import LayoutLoading from "./layout-loading";
export default function Suspense({
  children,
  isLoading = false,
  loadingLayout = null,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingLayout?: React.ReactNode;
}) {
  if (isLoading) {
    return loadingLayout || <LayoutLoading />;
  }
  return <>{children}</>;
}
