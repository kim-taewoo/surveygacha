interface ITitle {
  title: string[];
}

export default function Title({ title }: ITitle) {
  return (
    <section className="px-6 py-8">
      {title.map((text, index) => (
        <h1 key={index} className="text-2xl font-semibold leading-7">
          {text}
          <br />
        </h1>
      ))}
    </section>
  );
};
