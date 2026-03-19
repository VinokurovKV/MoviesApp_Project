import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

export default function FavoriteModal({
  open,
  onClose,
  onConfirm,
  title,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить в избранное</DialogTitle>

      <DialogContent>
        <Typography>
          Добавить "{title}" в избранное?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={onConfirm}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}