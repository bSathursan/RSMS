import { useEffect, useState } from "react"
import { handleToast } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getSubmission, getSubmissionList } from "../../api/submissionsApi";
import fileDownload from 'js-file-download'
import './ListSubmissions.css'

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    );
}

const handleDownloadSubmission = (key) => {
    getSubmission(key)
        .then((res) => {
            fileDownload(res.data, `${key.split('/')[0]}`)
        })
}
const ListSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [folder, setFolder] = useState('Assignments');

  useEffect(() => {
    handleFindSubmissions();
  }, [folder]);

  const handleFindSubmissions = () => {
    getSubmissionList(folder)
      .then(res => {
        res.data.isSuccessful ?
          setSubmissions(res.data.responseData.Contents) :
          handleToast();
      })
      .catch(() => handleToast());
  }

  const handleSubmissionSelect = (event) => {
    setFolder(event.target.value)
  }

  return (
    <>
    <h2 style={{ color:"#707070", fontWeight:"600"}}><center>Students Submissions - {folder}</center></h2>
      <FormControl  style={{ marginLeft:"20px"}}>
        <InputLabel id="role-label" style={{ color:"#707070",fontSize:"16px", fontWeight:"600"}}>Submission Type</InputLabel>
        <Select
          labelId="role-label"
          value={folder}
          label="Submission Type"
          onChange={handleSubmissionSelect}
        >
          <MenuItem style={{ color:"#707070",fontSize:"15px"}} value={'Assignments'}>Assignments</MenuItem>
          <MenuItem style={{ color:"#707070",fontSize:"15px"}} value={'Presentations'}>Presentations</MenuItem>
          <MenuItem style={{ color:"#707070",fontSize:"15px"}} value={'Topics'}>Topics</MenuItem>
        </Select>
      </FormControl>
      <TableContainer className="tableCont" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{color:"#707070",fontSize:"16px",fontWeight:"600"}}>Uploader</TableCell>
              <TableCell align="center"style={{color:"#707070",fontSize:"16px",fontWeight:"600"}}>Submission Type</TableCell>
              <TableCell align="center"style={{color:"#707070",fontSize:"16px",fontWeight:"600"}}>Size</TableCell>
              <TableCell align="center"style={{color:"#707070",fontSize:"16px",fontWeight:"600"}}>Last Modified</TableCell>
              <TableCell align="center"style={{color:"#707070",fontSize:"16px",fontWeight:"600"}}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions && submissions.map((sub, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{sub.Key.split('/')[2]}</TableCell>
                <TableCell align="center">{sub.Key.split('/')[0]}</TableCell>
                <TableCell align="center">{formatBytes(sub.Size)}</TableCell>
                <TableCell align="center">{ new Date(Date.parse(sub.LastModified)).toUTCString()}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDownloadSubmission(sub.Key)} style={{color:"green",fontSize:"14px",fontWeight:"600"}}>Download</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </>
  )

}

export default ListSubmissions;