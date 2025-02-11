import Link from "next/link";

export default function Home() {
  console.log("what i am I")
  return (

    <>
    <h1 className="text-3xl bg-red-600">Welcome

      <li>
        <Link href="/auth/signup">sing up</Link>
      </li>
      
      </h1> 

    </>
  );
}
