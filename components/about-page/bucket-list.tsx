import { bucketList } from "@/constants/bucket-list";

const BucketList = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 px-1.5 md:px-6 md:pt-16">
      <h2 className="px-1.5 md:px-3 font-heading text-[30px]">
        Bucket <span className="text-primary">List</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 mt-8 md:mt-0 border-t border-border">
        <div className="flex flex-col gap-2 md:mt-0 px-3 md:px-[30px] py-3 md:py-8">
          <ul className="text-muted-foreground text-sm list-disc list-inside">
            {bucketList.map((item) => (
              <li
                key={item.title}
                className={
                  item.status === "completed"
                    ? "opacity-75 text-muted-foreground line-through"
                    : undefined
                }
              >
                {item.status === "in-progress" ? (
                  <span className="bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary text-transparent animate-gradient marker:animate-gradient">
                    {item.title}
                  </span>
                ) : (
                  <span
                    className={
                      item.status === "completed"
                        ? undefined
                        : "text-foreground"
                    }
                  >
                    {item.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BucketList;
