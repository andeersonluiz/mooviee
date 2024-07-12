const SubItemChild = ({ title, color }: { title: string; color: string }) => {
  return <a className={`cursor-pointer text-2xl font-semibold ${color} `}>{title}</a>;
};
export default SubItemChild;
