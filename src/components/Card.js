import React from 'react';

//font-family="Roboto-Bold, Roboto" font-size="8" inline-size="50"
const cardStyle = {
  border: {
    width: 300,
    height: 200,
    rx: 12,
    ry: 12,
    fill: 'url(#bgc)',
    stroke: 'url(#bgc)',
  },
  imgBG:{
    r: 50,
    fill: 'white',
    stroke: 'white'
  },
  img: {
    clipPath: 'url(#iconc)',
    height: 100,
    width: 100,
  },
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

const Card = ({ nodeDatum, lorx, cy, left }) => {
  let lines = null;
  if (nodeDatum.biography) {
    lines = nodeDatum.biography.trim().split('\n');
  }

  if (!left) {
    lorx = lorx - 300
  }
  
  return (
    <React.Fragment>
      <defs>
        <linearGradient id="bgc" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="rgb(16, 24, 40)" />
          <stop offset="100%" stopColor="rgb(71, 84, 103)" />
        </linearGradient>
        <clipPath id="iconc">
          <circle cx={56+lorx} cy={cy} r="50"/>
        </clipPath>
      </defs>
      <rect {...cardStyle.border} x={lorx} y={-100+cy}/>
      <circle {...cardStyle.imgBG} cx={56+lorx} cy={cy}></circle>
      {nodeDatum.image ?
        <image {...cardStyle.img} x={6+lorx} y={-50+cy} href={`${process.env.PUBLIC_URL}/img/${nodeDatum.image}`} /> :
        <></>
      }

      <text x={110+lorx} y={-80+cy} {...cardStyle.lable}>姓名:</text>
      <text x={150+lorx} y={-80+cy} {...cardStyle.info}>{nodeDatum.name}</text>

      <text x={110+lorx} y={-60+cy} {...cardStyle.lable}>生辰:</text>
      <text x={150+lorx} y={-60+cy} {...cardStyle.info}>{nodeDatum.birthday}</text>

      <text x={110+lorx} y={-40+cy} {...cardStyle.lable}>仙逝:</text>
      <text x={150+lorx} y={-40+cy} {...cardStyle.info}>{nodeDatum.death}</text>

      <text x={110+lorx} y={-20+cy} {...cardStyle.lable}>性别:</text>
      <text x={150+lorx} y={-20+cy} {...cardStyle.info}>{nodeDatum.female ? "女" : "男"}</text>

      {lines &&
        Object.entries(lines).map((str, idx) => (
          idx >= 5 ?
            <text key={idx} y={14 * idx} x={10+lorx} {...cardStyle.info} fontSize={12}>{str[1]}</text>:
            <text key={idx} y={14 * idx} x={120+lorx} {...cardStyle.info} fontSize={12}>{str[1]}</text>
        ))
      };
    </React.Fragment>
  );
};

export default Card;
