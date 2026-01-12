const CardSkeleton = ({ index }) => {
  return (
    <div
      className={`group relative basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4 p-[1px] rounded-2xl bg-gradient-to-br from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-800 shadow-lg transition-all duration-500 ease-out opacity-100 translate-y-0 animate-pulse`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-base-100 flex flex-col gap-4 p-4 transition-transform duration-500">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700 blur-3xl" />

        <div className="relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700 aspect-[4/3]">
          <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 animate-pulse" />

          <div className="flex flex-col gap-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6 animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/5 animate-pulse" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-24 animate-pulse" />
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-full w-32 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
