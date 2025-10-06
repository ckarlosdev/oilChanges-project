import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CardName = ({ children }: Props) => {
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgray",
      }}
    >
      <span style={{ fontWeight: "bold" }}>{children}</span>
    </div>
  );
};

export default CardName;
