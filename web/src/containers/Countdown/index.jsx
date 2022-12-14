import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { CountdownStyle } from "./index.style";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#f44336",
  border: "2px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "50px 32px",
  fontSize: "28px",
  color: "white",
};

const formatTime = time => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = Math.floor(time - hours * 3600 - minutes * 60);

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return `${hours}:${minutes}:${seconds}`;
};

const Countdown = () => {
  const [countdown, setCountdown] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const timerId = useRef();

  const [reminderOpen, setReminderOpen] = useState(false);

  const [stop, setStop] = useState(false);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      setReminderOpen(true);
      setTimeout(() => {
        setReminderOpen(false);
      }, 3000);
    }
  }, [countdown]);

  const handleAdd = () => {
    setCountdown(Number(hour) * 3600 + Number(minute) * 60 + Number(second));
    setOpenAdd(false);
  };

  const handleStop = () => {
    setStop(false);
    timerId.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
  };

  const handleCancel = () => {
    setCountdown(0);
    setHour(0);
    setMinute(0);
    setSecond(0);
  };
  return (
    <CountdownStyle>
      {openAdd ? (
        <Box>
          <div className='AddContent'>
            <TextField
              id='hour'
              type='number'
              min='0'
              max='100'
              label='Gi???'
              variant='outlined'
              onChange={e => setHour(e.target.value)}
            />
            <p>H</p>
            <TextField
              id='minute'
              type='number'
              min='0'
              max='59'
              label='Ph??t'
              variant='outlined'
              onChange={e => setMinute(e.target.value)}
            />
            <p>M</p>
            <TextField
              id='second'
              type='number'
              min='0'
              max='59'
              label='Gi??y'
              variant='outlined'
              onChange={e => setSecond(e.target.value)}
            />
            <p>S</p>
          </div>
          <div className='footer'>
            <button onClick={() => setOpenAdd(false)}>Tho??t</button>
            <button onClick={() => handleAdd()}>L??u</button>
          </div>
        </Box>
      ) : (
        <>
          <div
            className='ReminderModal'
            style={{ display: reminderOpen ? "block" : "none" }}>
            <div style={style}>H???t gi??? r???i b???n ??i !!!</div>
          </div>
          <div className='Right'>
            <TipsAndUpdatesIcon />
            <button className='Add' onClick={() => setOpenAdd(true)}>
              C??i ?????t
            </button>
          </div>
          <div className='Content'>
            <h2>Countdown</h2>
            <div className='Time'>
              <h1>{countdown ? formatTime(countdown) : "00:00:00"}</h1>
              <div className='footer'>
                <button className='cancel' onClick={() => handleCancel()}>
                  Tho??t
                </button>
                {stop ? (
                  <button onClick={() => handleStop()} className='BtnStop'>
                    Ti???p t???c
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStop(true);
                      clearInterval(timerId.current);
                    }}
                    disabled={countdown === 0 || !countdown}>
                    B???t ?????u
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </CountdownStyle>
  );
};

export default Countdown;
