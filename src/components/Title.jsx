import "./Title.css";

export default function Title({ level = 1, children }) {
  const Tag = `h${level}`;
  return <Tag className={`title title-${level}`}>{children}</Tag>;
}
