import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState, useRef } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const GeneratePDF = () => {
  const { contract } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef();

  const fetchCandidates = async () => {
    if (!contract) return;

    try {
      setIsLoading(true);
      const count = await contract.methods.getCountCandidates().call();
      const candidateArray = [];

      for (let i = 1; i <= count; i++) {
        const candidate = await contract.methods.getCandidate(i).call();
        candidateArray.push({
          id: candidate[0],
          name: candidate[1],
          party: candidate[2],
          voteCount: parseInt(candidate[3], 10),
        });
      }

      setCandidates(candidateArray);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [contract]);

  const getTopCandidate = () => {
    if (!candidates.length) return null;
    return candidates.reduce((max, current) =>
      current.voteCount > max.voteCount ? current : max
    );
  };

  const generatePDF = async () => {
    const element = chartRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const date = new Date().toLocaleString();

    pdf.setFontSize(18);
    pdf.setTextColor("#1f2937"); // dark gray
    pdf.text("🗳️ Election Results", 20, 20);

    pdf.setFontSize(10);
    pdf.setTextColor("#6b7280"); // light gray
    pdf.text(`Generated on: ${date}`, 20, 26);

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 35, pdfWidth, pdfHeight);
    pdf.save("election-results.pdf");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topCandidate = getTopCandidate();

  // Prepare chart data
  const chartLabels = candidates.map((c) => c.name);
  const chartVotes = candidates.map((c) => c.voteCount);

  const chartColors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#9c27b0",
    "#e91e63",
    "#00bcd4",
  ];

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Votes",
        data: chartVotes,
        backgroundColor: chartColors,
        borderWidth: 1,
        borderColor: "#e5e7eb",
      },
    ],
  };

  const pieData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Vote Share",
        data: chartVotes,
        backgroundColor: chartColors,
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false },
    },
  };

  return (
    <div className="bg-white w-full max-w-4xl mt-10 p-6 relative z-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Election Results</h2>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading results...</p>
      ) : candidates.length > 0 ? (
        <>
          <div ref={chartRef} className="bg-gray-50 p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-2 text-black">
              🏆 Winner:{" "}
              <span className="text-green-600">
                {topCandidate.name} ({topCandidate.party})
              </span>{" "}
              with <span className="font-bold">{topCandidate.voteCount}</span>{" "}
              votes
            </p>

            <table className="text-center text-black table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-left">ID</th>
                  <th className="border border-gray-300 p-3 text-left">Name</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Party
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Votes
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-gray-100 ${
                      c.id === topCandidate.id ? "bg-green-100" : ""
                    }`}
                  >
                    <td className="border border-gray-300 p-3">{c.id}</td>
                    <td className="border border-gray-300 p-3">{c.name}</td>
                    <td className="border border-gray-300 p-3">{c.party}</td>
                    <td className="border border-gray-300 p-3">
                      {c.voteCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Graphs */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow border h-[300px]">
                <h3 className="text-center font-semibold mb-2 text-black text-sm">
                  Votes Distribution (Bar)
                </h3>
                <Bar data={barData} options={chartOptions} />
              </div>

              <div className="bg-white p-4 rounded-md shadow border h-[300px]">
                <h3 className="text-center font-semibold mb-2 text-black text-sm">
                  Votes Share (Pie)
                </h3>
                <Pie data={pieData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Download Results as PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No results available</p>
      )}
    </div>
  );
};

export default GeneratePDF;
