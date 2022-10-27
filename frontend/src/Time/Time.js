import "../App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

const Time = ({ time, setTimes }) => {
  const handleDelete = async () => {
    await fetch("http://localhost:5000/api/stopwatch/" + time.id, {
      method: "DELETE",
    });
    fetch("http://localhost:5000/api/stopwatch")
      .then((res) => res.json())
      .then((data) => setTimes(data));
  };

  return (
    <div className="time">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2>{time.time}</h2>
        <Button
          variant="text"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Grid>
    </div>
  );
};

export default Time;
