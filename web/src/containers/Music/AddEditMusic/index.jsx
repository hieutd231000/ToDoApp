import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import MusicLayout from "../../layouts/MusicLayout";
import { AddMusicStyle } from "./index.style";
import Loading from "../../../components/Loading";
import SuccessNotification from "../../../components/SuccessNotification";

const AddEditMusic = () => {
  const [musicUrl, setMusicUrl] = useState("");
  const [musicType, setMusicType] = useState("");
  const [musicName, setMusicName] = useState("");

  const [urlError, setUrlError] = useState(false);
  const [urlErrorText, setUrlErrorText] = useState("");

  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");

  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const token = JSON.parse(localStorage.getItem("todoapp_token"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    link: musicUrl,
    category_id: musicType,
    name: musicName,
  };

  // convert string status to number
  const convertStatus = status => {
    var num = -1;
    switch (status) {
      case "ロフィ":
        return (num = 1);
      case "ポップス":
        return (num = 2);
      case "EDM":
        return (num = 3);
      case "ほかの":
        return (num = 4);
      default:
        return num;
    }
  };

  // handle url
  const handleUrl = e => {
    setMusicUrl(e.target.value);
    if (e.target.value !== "") {
      setUrlError(false);
      setUrlErrorText("");
      setMusicUrl(e.target.value);
    } else {
      setUrlError(true);
      setUrlErrorText("Yêu cầu nhập đường dẫn bài hát!");
    }
  };

  // handle Name
  const handleName = e => {
    setMusicName(e.target.value);
    if (e.target.value !== "") {
      setNameError(false);
      setNameErrorText("");
      setMusicName(e.target.value);
    } else {
      setNameError(true);
      setNameErrorText("Yêu cầu nhập tên bài hát!");
    }
  };

  // get current task
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/getMusic?id=${params.id}`,
        config,
        params.id,
      )
      .then(res => {
        setMusicUrl(res.data.data.link);
        setMusicType(res.data.data.category_id);
        setMusicName(res.data.data.name);
      })
      .catch(error => console.log(error));
  }, []);

  // submit task
  const handleSubmit = e => {
    e.preventDefault();
    if (params.id) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/music/${params.id}/update`,
          bodyParameters,
          config,
        )
        .then(res => {
          setLoading(false);
          setEditSuccess(true);
          setTimeout(() => {
            navigate("/home2");
          }, 1300);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/music/add`,
          bodyParameters,
          config,
        )
        .then(res => {
          setLoading(false);
          setAddSuccess(true);
          setTimeout(() => {
            navigate("/home2");
          }, 1300);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  console.log(musicType);

  return (
    <MusicLayout>
      <AddMusicStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <p>URL</p>
          <TextField
            id='url'
            error={urlError}
            helperText={urlErrorText}
            label='Nhập đường dẫn'
            variant='outlined'
            value={musicUrl ? musicUrl : ""}
            onChange={e => handleUrl(e)}
            required
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <p>Thể loại</p>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Chọn thể loại</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='type'
              value={musicType}
              label='Lựa chọn thể loại'
              onChange={e => setMusicType(e.target.value)}
              required>
              <MenuItem value={1}>Lofi</MenuItem>
              <MenuItem value={2}>Pop</MenuItem>
              <MenuItem value={3}>EDM</MenuItem>
              <MenuItem value={4}>Khác</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <p>Tên bài hát</p>
          <TextField
            id='name'
            error={nameError}
            helperText={nameErrorText}
            label='Nhập tên bài hát'
            variant='outlined'
            value={musicName ? musicName : ""}
            onChange={e => handleName(e)}
            required
          />
        </Box>

        <div className='Footer'>
          <Button type='submit'>Lưu</Button>
          <Button>
            <p onClick={() => navigate("/home2")}>Thoát</p>
          </Button>
        </div>
        {loading ? <Loading /> : ""}
        {addSuccess ? (
          <SuccessNotification
            isOpen={addSuccess}
            textSuccess='Thêm nhiệm vụ thành công!'
          />
        ) : (
          ""
        )}
        {editSuccess ? (
          <SuccessNotification
            isOpen={editSuccess}
            textSuccess='Chỉnh sửa nhiệm vụ thành công!'
          />
        ) : (
          ""
        )}
      </AddMusicStyle>
    </MusicLayout>
  );
};

export default AddEditMusic;
