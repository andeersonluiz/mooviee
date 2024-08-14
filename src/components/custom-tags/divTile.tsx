import { useRouter } from 'next/navigation';

const DivTile = ({
  children,
  path,
  className,
}: {
  children: any;
  path: string;
  className: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={className}
      onClick={() => {
        router.push(path);
      }}
    >
      {children}
    </div>
  );
};

export default DivTile;
