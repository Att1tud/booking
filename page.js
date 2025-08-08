'use client';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

function seedWeek(offset=0){
  const now = dayjs().add(offset, 'week');
  const monday = now.startOf('week').add(1, 'day');
  const slots = [
    { title:'Strength Power', area:'SALA_PESI', level:'INTERMEDIO', start:'07:00', end:'08:00', cap:12 },
    { title:'Speed & Agility', area:'SPRINT_TRACK', level:'AVANZATO', start:'08:15', end:'09:15', cap:8 },
    { title:'Hyrox Prep', area:'SALA_PESI', level:'INTERMEDIO', start:'18:30', end:'19:30', cap:12 },
    { title:'Conditioning Team', area:'CAMPO', level:'BASE', start:'19:45', end:'20:45', cap:16 },
  ];
  const out=[]; let id=1;
  for(let d=0; d<7; d++){
    const date = monday.add(d, 'day');
    for(const s of slots){
      const [sh, sm] = s.start.split(':').map(Number);
      const [eh, em] = s.end.split(':').map(Number);
      const start = date.hour(sh).minute(sm).second(0).millisecond(0);
      const end = date.hour(eh).minute(em).second(0).millisecond(0);
      out.push({
        id: String(id++),
        title: s.title,
        coach: ['Ciro','Giorgia','Luca','Marta'][Math.floor(Math.random()*4)],
        start: start.toISOString(),
        end: end.toISOString(),
        level: s.level,
        area: s.area,
        capacity: s.cap,
        booked: Math.floor(Math.random()*(s.cap-1)),
        waitlist: 0,
      });
    }
  }
  return out;
}

export default function Home(){
  const [weekOffset, setWeekOffset] = useState(0);
  const data = useMemo(()=> seedWeek(weekOffset), [weekOffset]);
  const monday = dayjs(data[0]?.start);
  const sunday = dayjs(data[data.length-1]?.start);

  return (
    <section>
      <div className="card" style={{marginBottom:12}}>
        <h1>Prenota. Allena. Migliora.</h1>
        <div className="subtitle">Versione demo senza login né database, ideale per il primo deploy su Vercel.</div>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button className="btn btn-outline" onClick={()=>setWeekOffset(o=>Math.max(0,o-1))} disabled={weekOffset===0}>◀</button>
          <span className="subtitle">Settimana {monday.format('DD/MM')} → {sunday.format('DD/MM')}</span>
          <button className="btn btn-outline" onClick={()=>setWeekOffset(o=>o+1)}>▶</button>
        </div>
      </div>

      <div className="grid">
        {data.map(k => (
          <div key={k.id} className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600}}>{k.title} <span className="subtitle">· {k.level}</span></div>
                <div className="subtitle">Coach: <span className="meta">{k.coach}</span> · Area: <span className="meta">{k.area.replace('_',' ')}</span></div>
              </div>
              <div className="small muted">{k.booked}/{k.capacity}</div>
            </div>
            <div style={{marginTop:8}} className="meta">{dayjs(k.start).format('DD/MM HH:mm')} – {dayjs(k.end).format('HH:mm')}</div>
            <div style={{display:'flex', gap:8, marginTop:10, alignItems:'center'}}>
              <button className="btn btn-primary">Prenota</button>
              <button className="btn btn-outline">Annulla</button>
              <span className="chip">{k.capacity - k.booked > 0 ? 'Posti liberi: ' + (k.capacity-k.booked) : 'Piena'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
