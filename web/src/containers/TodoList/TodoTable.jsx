import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StatusColor, DeleteModalStyle } from "./index.style";
import Button from "../../components/Button";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

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

const TodoTable = () => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState(data);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentTime, setCurrentTime] = useState();
  const [reminderOpen, setReminderOpen] = useState(false);
  const [listDelete, setListDelete] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenDeleteMany, setIsOpenDeleteMany] = useState(false);
  const [isSortTask, setIsSortTask] = useState(false);
  const [isSortStatus, setIsSortStatus] = useState(false);

  const navigate = useNavigate();

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // handle open delete many task modal
  const handleOpenDeleteMany = () => {
    setIsOpenDeleteMany(true);
  };
  const handleCloseDeleteMany = () => {
    setIsOpenDeleteMany(false);
  };

  // get data
  const token = JSON.parse(localStorage.getItem("todoapp_token"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const bodyParameters = {
    key: "value",
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/todo`, config)
      .then(res => {
        setData(res.data.data);
        setFilterData(res.data.data);
      })
      .catch(error => console.log(error));
  }, []);

  // columns
  const columns = [
    {
      id: "task_name",
      label: (
        <>
          <ArrowDownwardIcon
            onClick={() => {
              setIsSortTask(!isSortTask);
              if (!isSortTask) {
                sortTaskName(filterData);
              } else {
                sortId(filterData);
              }
            }}
            style={isSortTask ? {} : { opacity: "0.3" }}
          />
          Công việc
        </>
      ),
      minWidth: 250,
      align: "center",
    },
    {
      id: "created_at",
      label: "Thời gian tạo",
      minWidth: 200,
      align: "center",
    },
    {
      id: "status",
      label: (
        <>
          <ArrowDownwardIcon
            onClick={() => {
              setIsSortStatus(!isSortStatus);
              if (isSortStatus) {
                sortId(filterData);
              } else {
                sortStatus(filterData);
              }
            }}
            style={isSortStatus ? {} : { opacity: "0.3" }}
          />
          Trạng thái
        </>
      ),
      minWidth: 150,
      align: "center",
    },
    { id: "action", label: "Hành động", minWidth: 250, align: "center" },
    {
      id: "checkbox",
      label: listDelete.length ? (
        <>
          <DeleteOutlineOutlinedIcon
            style={{ fontSize: "40px", color: "red" }}
            onClick={() => handleOpenDeleteMany()}
          />
          <Modal open={isOpenDeleteMany} onClose={() => setOpen(false)}>
            <DeleteModalStyle>
              <div className='title'>
                Bạn có chắc muốn xóa danh sách các công việc này chứ ?
              </div>
              <div className='footer'>
                <Button>
                  <p onClick={() => handleCloseDeleteMany()}>Không</p>
                </Button>
                <Button>
                  <p
                    onClick={() => {
                      handleDeleteManyTask(listDelete);
                      handleCloseDeleteMany();
                    }}>
                    Đồng ý
                  </p>
                </Button>
              </div>
            </DeleteModalStyle>
          </Modal>
        </>
      ) : (
        ""
      ),
      minWidth: 50,
      align: "start",
    },
  ];

  // handleTime
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString([])),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  //delete
  const handleDelete = id => {
    setData(data.filter(elm => elm.id !== id));
    axios.post(
      `${process.env.REACT_APP_BASE_URL}/todo/${id}/delete`,
      bodyParameters,
      config,
    );
  };

  const handleClose = () => {
    setOpen(false);
    setActiveModal(null);
  };
  const handleOpen = index => {
    setActiveModal(index);
  };

  // handle status color
  const handleStatusColor = status => {
    switch (status) {
      case "対応しない":
        return (
          <StatusColor bgColor='yellow' color='black'>
            Không hoàn thành
          </StatusColor>
        );
      case "未対応":
        return <StatusColor bgColor='red'>Quá hạn</StatusColor>;
      case "対応中":
        return <StatusColor bgColor='blue'>Đang thực hiện</StatusColor>;
      case "完了":
        return <StatusColor bgColor='green'>Đã hoàn thành</StatusColor>;
      default:
        break;
    }
  };

  // handle reminder notification
  useEffect(() => {
    if (data) {
      data.forEach(task => {
        if (currentTime === task.end) {
          setReminderOpen(true);
          console.log("open");
          setTimeout(() => {
            setReminderOpen(false);
          }, 3000);
        }
      });
    }
  }, [currentTime]);

  // handle delete many task
  const handleListDelete = id => {
    if (!listDelete.includes(id)) {
      setListDelete([...listDelete, id]);
    } else {
      listDelete.splice(listDelete.indexOf(id), 1);
      setListDelete([...listDelete]);
    }
    setIsChecked(true);
  };
  const handleDeleteManyTask = ids => {
    setData(data.filter(elm => !ids.includes(elm.id)));
    setListDelete([]);
    listDelete.map(id => {
      axios.post(
        `${process.env.REACT_APP_BASE_URL}/todo/${id}/delete`,
        bodyParameters,
        config,
      );
    });
  };

  // format date
  const formatDate = str => {
    const arr = str.split("-");
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
  };

  // sorting
  const sortId = compareValue => {
    compareValue.sort((a, b) => (a.id > b.id ? 1 : -1));
    setFilterData(compareValue);
  };

  const sortTaskName = compareValue => {
    compareValue.sort((a, b) => (a.task_name > b.task_name ? 1 : -1));
    setFilterData(compareValue);
  };

  const sortStatus = compareValue => {
    compareValue.sort((a, b) => (a.status > b.status ? 1 : -1));
    setFilterData(compareValue);
  };

  // Filter
  const filterStatus = e => {
    if (e.target.value === 0) {
      setFilterData(data);
    } else {
      const newData = data.filter(dt => dt.status === e.target.value);
      setFilterData(newData);
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 200, marginBottom: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id='status-type-label'>Lọc trạng thái</InputLabel>
          <Select
            labelId='status-type-label'
            id='status'
            defaultValue={0}
            label='Lọc trạng thái'
            onChange={filterStatus}>
            <MenuItem value={"対応しない"}>Không hoàn thành</MenuItem>
            <MenuItem value={"未対応"}>Quá hạn</MenuItem>
            <MenuItem value={"対応中"}>Đang thực hiện</MenuItem>
            <MenuItem value={"完了"}>Đã hoàn thành</MenuItem>
            <MenuItem value={0}>Toàn bộ</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div
          className='ReminderModal'
          style={{ display: reminderOpen ? "block" : "none" }}>
          <div style={style}>Đến giờ rồi bạn ơi !!!</div>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData ? (
                filterData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map(column => {
                          const value =
                            column.id === "action" ? (
                              <>
                                <NotificationsActiveOutlinedIcon
                                  onClick={() =>
                                    navigate(`/tasks/${row.id}/reminder-task`)
                                  }
                                />
                                <EditOutlinedIcon
                                  style={{ padding: "0 20px" }}
                                  onClick={() =>
                                    navigate(`/tasks/${row.id}/edit-task`)
                                  }
                                />
                                <DeleteOutlineOutlinedIcon
                                  onClick={e => {
                                    handleOpen(row.id);
                                  }}
                                />
                                <Modal
                                  open={activeModal === row.id}
                                  onClose={() => setOpen(false)}>
                                  <DeleteModalStyle>
                                    <div className='title'>
                                      Bạn có chắc muốn xóa công việc này chứ ?
                                    </div>
                                    <div className='footer'>
                                      <Button>
                                        <p onClick={() => handleClose()}>
                                          Không
                                        </p>
                                      </Button>
                                      <Button>
                                        <p
                                          onClick={() => {
                                            handleDelete(row.id);
                                            handleClose();
                                          }}>
                                          Đồng ý
                                        </p>
                                      </Button>
                                    </div>
                                  </DeleteModalStyle>
                                </Modal>
                              </>
                            ) : column.id === "status" ? (
                              handleStatusColor(row[column.id])
                            ) : column.id === "checkbox" ? (
                              <Checkbox
                                checked={
                                  listDelete.includes(row.id)
                                    ? isChecked
                                    : false
                                }
                                onClick={() => handleListDelete(row.id)}
                              />
                            ) : column.id === "created_at" ? (
                              formatDate(row[column.id])
                            ) : (
                              row[column.id]
                            );
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={filterData ? filterData.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TodoTable;
