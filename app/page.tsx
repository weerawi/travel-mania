import { redirect } from "next/navigation";

export default function Home() {
  console.log("what i am I")
   
  redirect("/auth/signin")
   


  return (

    <>
    <h1 className="text-3xl bg-gray-200"> 

      </h1> 

    </>
  );
}
