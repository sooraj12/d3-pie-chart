import React from "react";

import { PieChart } from "../PieChart";

const data = [
  {
    hgv: 38,
    max_score: 100,
    funName: "Retail",
  },
  {
    hgv: 50,
    max_score: 78,
    funName: "Leadership and Management",
  },
  {
    hgv: 70,
    max_score: 150,
    funName: "Experienced Managers",
  },
  {
    hgv: 20,
    max_score: 50,
    funName: "Cultural",
  },
  {
    hgv: 30,
    max_score: 40,
    funName: "Functional",
  },
  // {
  //   hgv: 0,
  //   max_score: 0,
  // },
];

function LearnerInfo() {
  // const [learnerData, setLearnerData] = useState([]);
  return (
    <div className="learner-info">
      <PieChart height="500" width="800" data={data} />
    </div>
  );
}

export { LearnerInfo };
