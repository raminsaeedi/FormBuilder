import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import { ReactNode } from "react";
import { FieldType } from "../../types/form";

export interface FieldTypeMeta {
  icon: ReactNode;
  color: string;
  label: string;
}

export const fieldTypeMeta: Record<FieldType, FieldTypeMeta> = {
  text: {
    icon: <ShortTextRoundedIcon fontSize="small" />,
    color: "#2563eb",
    label: "Text",
  },
  email: {
    icon: <MailOutlineRoundedIcon fontSize="small" />,
    color: "#0891b2",
    label: "Email",
  },
  phone: {
    icon: <PhoneRoundedIcon fontSize="small" />,
    color: "#0f766e",
    label: "Phone",
  },
  password: {
    icon: <LockOutlinedIcon fontSize="small" />,
    color: "#7c3aed",
    label: "Password",
  },
  number: {
    icon: <NumbersRoundedIcon fontSize="small" />,
    color: "#b45309",
    label: "Number",
  },
  date: {
    icon: <CalendarTodayRoundedIcon fontSize="small" />,
    color: "#be185d",
    label: "Date",
  },
  textarea: {
    icon: <NotesRoundedIcon fontSize="small" />,
    color: "#475569",
    label: "Textarea",
  },
  select: {
    icon: <SubjectRoundedIcon fontSize="small" />,
    color: "#16a34a",
    label: "Select",
  },
  radio: {
    icon: <RadioButtonCheckedRoundedIcon fontSize="small" />,
    color: "#ea580c",
    label: "Radio",
  },
  checkbox: {
    icon: <CheckBoxOutlinedIcon fontSize="small" />,
    color: "#dc2626",
    label: "Checkbox",
  },
};
