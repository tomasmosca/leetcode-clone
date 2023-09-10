import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";

export default function Home() {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;
  return (
      <div className="bg-dark-layer-2 min-h-screen relative">
        <Topbar />
        <h1 className="text-gray-400 text-2xl text-center font-medium mt-10 mb-5">Coding Problems</h1>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          <table className="text-sm text-left text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            <thead className="bg-dark-layer-2 text-gray-400 border-b text-xs">
              <tr>
                <th scope="col" className="px-1 py-3 w-0 font-medium">STATUS</th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">TITLE</th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">DIFFICULTY</th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">CATEGORY</th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">SOLUTION</th>
              </tr>
            </thead>
            <ProblemsTable />
          </table>
        </div>
      </div>
  )
}
