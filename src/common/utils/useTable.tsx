import { Button, Input, InputRef, Select, Space, TableColumnType } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";

const useTable = () => {
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: any,
    onSearch: (column: string, value: string) => void | undefined
  ) => {
    confirm();
    if (onSearch !== undefined) {
      onSearch(dataIndex, selectedKeys[0]);
    }
  };

  const handleSelect = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: any,
    onSelect: (column: string, value: string) => void | undefined
  ) => {
    confirm();
    if (onSelect !== undefined) {
      onSelect(dataIndex, selectedKeys[0]);
    }
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"]
  ) => {
    clearFilters();
    confirm();
  };

  const getFilterSearchBox = ({
    name,
    onFilter,
    placeholder,
  }: {
    name: string;
    onFilter?: (column: string, value: string) => void;
    placeholder?: string;
  }): TableColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      const onChangeInput = (e) =>
        setSelectedKeys(e.target.value ? [e.target.value] : []);

      return (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            placeholder={placeholder}
            value={selectedKeys[0]}
            onChange={onChangeInput}
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, name, onFilter)
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, name, onFilter)
              }
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              size="small"
              style={{ width: 90 }}
            >
              Clear
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
  });

  const getFilterSelectBox = ({
    name,
    onFilter,
    placeholder,
    options,
  }: {
    name: string;
    onFilter?: (column: string, value: string) => void;
    placeholder?: string;
    options: Array<{ label: string; value: any }>;
  }): TableColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Select
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(value) => {
            setSelectedKeys(value ? [value] : []);
            handleSelect(selectedKeys as string[], confirm, name, onFilter);
          }}
          options={options}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Clear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FilterFilled style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
  });

  return { getFilterSearchBox, getFilterSelectBox };
};

export default useTable;
