import React from 'react';

//font-family="Roboto-Bold, Roboto" font-size="8" inline-size="50"
const textStyle = {
  lable: {
    fill: '#FFFFFF',
    stroke: '#FFFFFF',
    strokeWidth: 1,
    fontSize: 14,
    textAnchor: "start",
  },
  info: {
    fill: '#FFFFFF',
    stroke: '#FFFFFF',
    strokeWidth: 1,
    fontSize: 14,
    textAnchor: "start",
  },
};

const Card = ({ orientation, nodeDatum }) => {
  let lines = null;
  if (nodeDatum.biography) {
    lines = nodeDatum.biography.trim().split('\n');
  }

  return (
    <React.Fragment>
      <defs>
        <linearGradient id="bgc" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="rgb(16, 24, 40)" />
          <stop offset="100%" stopColor="rgb(71, 84, 103)" />
        </linearGradient>
        <clipPath id="iconc">
          <circle cx="120" cy="20" r="50" />
        </clipPath>
      </defs>
      <rect x={56} y={-80} width={360} height={200} rx={12} ry={12} fill="url(#bgc)" stroke="url(#bgc)" />
      <circle cx={120} cy={20} r={50} fill={"white"} stroke={"white"}></circle>
      {nodeDatum.image ?
        <image clipPath="url(#iconc)" x={70} y={-30} height={100} width={100} href={`${process.env.PUBLIC_URL}/img/${nodeDatum.image}`} /> :
        <></>
      }

      <text x={180} y={-50} {...textStyle.lable}>姓名:</text>
      <text x={220} y={-50} {...textStyle.info}>{nodeDatum.name}</text>

      <text x={180} y={-20} {...textStyle.lable}>生辰:</text>
      <text x={220} y={-20} {...textStyle.info}>{nodeDatum.birthday}</text>

      <text x={180} y={10} {...textStyle.lable}>仙逝:</text>
      <text x={220} y={10} {...textStyle.info}>{nodeDatum.death}</text>

      <text x={180} y={40} {...textStyle.lable}>性别:</text>
      <text x={220} y={40} {...textStyle.info}>{nodeDatum.female ? "女" : "男"}</text>

      {lines &&
        Object.entries(lines).map((str, idx) => (
          <text key={idx} x={180} y={60 + 14 * idx} {...textStyle.info} fontSize={12}>{str[1]}</text>
        ))
      };
    </React.Fragment>
  );
};

export default Card;
