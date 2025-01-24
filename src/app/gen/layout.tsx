type Props = {
  children: React.ReactNode;
};

const GenerateLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F4F4F5]">
      {children}
    </main>
  );
};

export default GenerateLayout;
