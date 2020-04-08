import React from 'react';
import c from './ProgressBar.module.scss';

interface Props {
  title: string;
  value: number;
  progress: string;
}

export const ProgressBar: React.FC<Props> = ({ title, value, progress }) => {
  return (
    <div className={c.wrap}>
      <div className={c.markerWrap}>
        <div className={c.marker} style={{ left: progress }}/>
        <div className={c.markerNumber} style={{ left: progress }}>{value}</div>
      </div>
      <div className={c.bar}>
        <div className={c.barProgress} style={{ width: progress }}/>
        <div className={c.barGray}/>
      </div>
      <div className={c.barTitle}>{title}</div>
    </div>
  );
};
