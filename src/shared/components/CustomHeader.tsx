interface CustomHeaderProps {
  title: string;
  description?: string;
}

export const CustomHeader = (props: CustomHeaderProps) => {
  return (
    <div className="content-center">
      <h1>{props.title}</h1>
      {props.description && <p>{props.description}</p>}
    </div>
  );
};
