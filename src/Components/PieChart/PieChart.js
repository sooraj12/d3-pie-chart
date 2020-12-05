import React, { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

function PieChart({ height, width, data }) {
  const radius = Math.min(width, height * 0.6375) / 2;
  const innerRadius = 0.2 * radius;
  const [backArcs, setBackArcs] = useState([]);
  const [frontArcs, setFrontArcs] = useState([]);

  const pieGenerator = useMemo(
    () =>
      d3
        .pie()
        .sort(null)
        .value((d) => 1),
    []
  );
  const arcGenerator = useMemo(
    () => d3.arc().innerRadius(innerRadius).cornerRadius(2).padAngle(0.035),
    [innerRadius]
  );
  const radiusScale = useMemo(() => d3.scaleLinear().range([0, 100]), []);

  useEffect(() => {
    let minOuterVal = d3.min(data, (d) => d.max_score);
    let maxOuterVal = d3.max(data, (d) => d.max_score);
    let minInnerVal = d3.min(data, (d) => d.hgv);

    minOuterVal = minOuterVal > minInnerVal ? minInnerVal : minOuterVal;

    const slices = pieGenerator(data);
    const scoreScale = radiusScale.domain([minOuterVal, maxOuterVal]);

    //create back arcs
    const backArcSlices = slices.map((slice) => {
      const outerRadius =
        ((radius - innerRadius) * scoreScale(slice.data.max_score)) / 100 +
        innerRadius;

      return arcGenerator({
        ...slice,
        outerRadius: outerRadius,
      });
    });

    //create front arcs
    const frontArcSlices = slices.map((slice) => {
      const outerRadius =
        ((radius - innerRadius) * scoreScale(slice.data.hgv)) / 100 +
        innerRadius;
      return arcGenerator({
        ...slice,
        outerRadius: outerRadius,
      });
    });

    //create polylines

    //create text legends

    setBackArcs(backArcSlices);
    setFrontArcs(frontArcSlices);
  }, [data, radiusScale, innerRadius, radius, arcGenerator, pieGenerator]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2} , ${height / 2})`}>
        <g className="backArcs">
          {backArcs.map((arc, index) => {
            return <path key={index} d={arc} fill="#e8e7e7"></path>;
          })}
        </g>
        <g className="frontArcs">
          {frontArcs.map((arc, index) => {
            return <path key={index} d={arc} fill="lightBlue"></path>;
          })}
        </g>
        <g className="labels"></g>
        <g className="lines"></g>
      </g>
    </svg>
  );
}

export { PieChart };
