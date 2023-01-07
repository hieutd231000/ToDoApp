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
import { Box, Modal, Typography } from "@mui/material";

const columns = [
  { id: "task_name", label: "Công việc", minWidth: 300, align: "center" },
  { id: "created_at", label: "Thời gian tạo", minWidth: 150, align: "center" },
  { id: "status", label: "Trạng thái", minWidth: 150, align: "center" },
  { id: "action", label: "Hành động", minWidth: 200, align: "center" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#ccc",
  border: "2px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const TodoTable = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentTime, setCurrentTime] = useState();
  const [reminderOpen, setReminderOpen] = useState(false);
  const handleReminderClose = () => setReminderOpen(false);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      })
      .catch(error => console.log(error));
  }, []);

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
        return <StatusColor bgColor='blue'>{status}</StatusColor>;
      case "未対応":
        return <StatusColor bgColor='red'>{status}</StatusColor>;
      case "対応中":
        return (
          <StatusColor bgColor='yellow' color='black'>
            {status}
          </StatusColor>
        );
      case "完了":
        return <StatusColor bgColor='green'>{status}</StatusColor>;
      default:
        break;
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {data
        ? data.forEach(task => {
            if (currentTime === task.end) {
              setReminderOpen(true);
            }
          })
        : ""}
      <div className='ReminderModal' style={{ backgroundColor: "red" }}>
        <div style={style}>hello</div>
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
            {data ? (
              data
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
                                      <p onClick={() => handleClose()}>Không</p>
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
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TodoTable;
