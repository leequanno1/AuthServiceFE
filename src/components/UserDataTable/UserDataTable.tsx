import React, { useState } from "react";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import { User } from "../../entities/user";
import "./UserDataTable.css";

interface UserDataTableProps {
  columns: string[];
  data: User[];
  onRowSelected?: (selectedUser:User[]) => any;
}

const UserDataTable: React.FC<UserDataTableProps> = ({ columns, data, onRowSelected }) => {
  const [rowPerPage, setRowPerPage] = useState<number>(10);
  const rowHeight = 35;
  const tableHeight = (rowPerPage + 1) * (rowHeight + 1);

  // convert string[] -> TableColumn<User>[]
  const convertColumns = (cls: string[]): TableColumn<User>[] => {
    return cls.map((item) => ({
      name: (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "visible",
            display: "inline-block",
            fontSize: "16px",
          }}
          title={item}
        >
          {item}
        </div>
      ),
      selector: (row: User) => `${row[item as keyof User]}`,
      cell: (row: User) => {
        const cellData = row[item as keyof User];
        return (
          <div
            title={`${cellData}`}
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "inline-block",
              textAlign: "start",
              overflow: "hidden",
              color: cellData?"var(--text-color)":"var(--danger-color)",
            }}
          >
            {`${cellData?cellData:"null"}`}
          </div>
        );
      },
      sortable: true,
      wrap: false,
      reorder: true,
      minWidth: "150px",
    }));
  };

  const customStyles: TableStyles = {
    headCells: {
      style: {
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "visible",
        textOverflow: "unset",
        maxWidth: "none",
        minHeight: `${rowHeight}px`,
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "visible",
        textOverflow: "unset",
        maxWidth: "none",
        minHeight: `${rowHeight}px`,
      },
    },
    tableWrapper: {
      style: {
        minHeight: `${tableHeight}px`, 
        overflowX: "auto", 
        maxWidth: "none",
      },
    },
  };

  return (
    <div className="user-data-table-wrapper" >
      <DataTable
        columns={convertColumns(columns)}
        data={data}
        pagination
        highlightOnHover
        selectableRows
        customStyles={customStyles}
        dense
        onSelectedRowsChange={(state) => {
          if (onRowSelected) {
            onRowSelected(state.selectedRows);
          }
        }}
        persistTableHead
        paginationPerPage={rowPerPage}
        onChangeRowsPerPage={(newPerPage: number, page: number) => {
          setRowPerPage(newPerPage);
        }}
      />
    </div>
  );
};

export default UserDataTable;
