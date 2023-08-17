import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
  return (
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar />
        <h1 className="text-white text-3xl text-center mt-10">Coding Problems</h1>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          <table className="flex justify-center items-center">
            <thead className="bg-dark-layer-2 border-b-2 text-white">
              <tr>
                <th scope="col" className="text-sm font-light pr-20">STATUS</th>
                <th scope="col" className="text-sm font-light pr-20">TITLE</th>
                <th scope="col" className="text-sm font-light pr-20">DIFFICULTY</th>
                <th scope="col" className="text-sm font-light pr-20">CATEGORY</th>
                <th scope="col" className="text-sm font-light pr-20">SOLUTION</th>
              </tr>
            </thead>
          </table>
        </div>
      </main>
  )
}
