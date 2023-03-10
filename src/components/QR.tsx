import { memo } from "react";
import { QRCode } from "react-qrcode-logo";

import BackDrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";

const TodoBackdrop = styled(BackDrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.8)",
}));

type Props = {
  open: boolean;
  onClose: () => void;
};

export const QR = memo((props: Props) => {
  return (
    <TodoBackdrop open={props.open} onClick={props.onClose}>
      <QRCode value="https://sprout2000.github.io/todo" />
    </TodoBackdrop>
  );
});

QR.displayName = 'QR';