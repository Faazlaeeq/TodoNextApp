import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("{NEXT_PUBLIC_ROOT_URL}api/topics");

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json(); // Parse response body as JSON
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  try {
    const myFetch = await getTopics();
    console.log(myFetch["topics"]);

    return (
      <>
        {myFetch["topics"].map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))}
      </>
    );
  } catch (error) {
    console.log("Error rendering topics: ", error);
    return null; // Return null or some error component to handle errors
  }
}