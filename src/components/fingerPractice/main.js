import React, { useState, useEffect } from 'react';
import './main.scss';

const allDic = [
  [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    '[',
    ']',
  ],

  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],

  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
];

const randomDic = () => {
  const viewDic = [];

  const temp1 = Math.floor(Math.random() * allDic.length);
  const temp2 = Math.floor(
    Math.random() * allDic[temp1].length,
  );

  return allDic[temp1][temp2];
};

const Main = () => {
  const [dic, setDic] = useState();
  const [score, setScore] = useState(0);
  const [_dic, _setDic] = useState(1);

  const [trueDic, setTrueDic] = useState(randomDic());

  useEffect(() => {
    const handleKeyDown = (e) => {
      setDic(e.key.toUpperCase());
      _setDic(_dic * -1);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    const animationEffect = document.getElementById(dic);
    if (!animationEffect) {
      return;
    }

    const trueColor = 'green';
    const falseColor = 'red';

    animationEffect.animate(
      [
        { backgroundColor: 'white' },
        {
          backgroundColor:
            trueDic === dic ? trueColor : falseColor,
        },
        { backgroundColor: 'white' },
      ],
      {
        duration: 100,
      },
    );

    animationEffect.getAnimations()[0].onfinish = () => {
      if (trueDic === dic) {
        setScore(score + 10);
      }

      setTrueDic(randomDic());
    };
  }, [dic, _dic]);

  return (
    <div className="container">
      <div className="line-1">
        {allDic[0].map((member, idx) =>
          member === trueDic ? (
            <div
              className="trueBoxChar"
              id={member}
              key={idx}
            >
              {member}
            </div>
          ) : (
            <div className="boxChar" key={idx} id={member}>
              {member}
            </div>
          ),
        )}
      </div>
      <div className="line-2">
        {allDic[1].map((member, idx) =>
          member === trueDic ? (
            <div
              className="trueBoxChar"
              key={idx}
              id={member}
            >
              {member}
            </div>
          ) : (
            <div className="boxChar" key={idx} id={member}>
              {member}
            </div>
          ),
        )}
      </div>
      <div className="line-3">
        {allDic[2].map((member, idx) =>
          member === trueDic ? (
            <div
              className="trueBoxChar"
              key={idx}
              id={member}
            >
              {member}
            </div>
          ) : (
            <div className="boxChar" key={idx} id={member}>
              {member}
            </div>
          ),
        )}
      </div>

      <div>Score : {score}</div>
    </div>
  );
};

export default Main;
