import React from 'react';
import { Table, Menu, Dropdown, Icon } from 'antd';
import { withStyles, Button } from '@material-ui/core/';
import 'antd/dist/antd.css';
//import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  tableoption: {

  },
  option: {
    marginTop: theme.spacing(16),
    marginBotton: theme.spacing(8),
  },

  button: {
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(5),
    textAlign: 'right',
    marginTop: -21,

  },
  plusbutton: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    fontWeight: 'bold'
  },
  minusbutton: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    fontWeight: 'bold'
  },

  backgroundRed: {
    backgroundColor: '#fff1f0',
    color: 'red'
  },

  amountColumn: {
    marginRight: '10px'
  },

}));
const ColorButton = withStyles(theme => ({
  root: {
    borderColor: '#0062cc',
    '&:hover': {
      borderColor: '#0062cc',
    },
  },
}))(Button);

// const RemoveButton = withStyles(theme => ({
//   root: {
//     borderColor: '#0062cc',
//     '&:hover': {
//       borderColor: '#0062cc',
//     },
//   },
// }))(Button);





const pageInfo = {pageNumber:1};

function ContTable({ histShowModal,loadingTable, contList, showModal, contDelete, updateModalHandler, modalBtnHandler }) {
  const classes = useStyles();
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleMenuClick = key => {
    console.log("key", key);
    updateModalHandler(key)
  }
  const columns = [
    {
      title: '기관/회사',
      dataIndex: 'orgNm',
      ellipsis:true,
      width: '12%'
    },
    {
      title: '사업명',
      dataIndex: 'contNm',
      ellipsis:true,
      width: '20%'
    },
    {
      title: '담당자',
      dataIndex: 'empNm',
      align: 'center',
      // width: '5%',
    },
    // {
    //   title: '수주번호',
    //   dataIndex: 'contReportNo',
    //   align: 'center',
    //   render: (value, record, index) =>{
    //     return {
    //       children: value,
    //       props: {
    //         align: 'center',
    //       },
    //     };
    //   }
    // },
    {
      title: '계약일자',
      dataIndex: 'contDt',
      align: 'center',
      // width: '8%',
      render: (value, record, index) => {
        return {
          children: value,
          props: {
            align: 'center',
          },
        };
      }
    },
    {
      title: '계약금액',
      dataIndex: 'contTotAmt',
      align: 'right',
      // width: '9%',
      render: (value, record, index) => {
        return {
          children: (value == null ? "-" : parseInt(value) / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 만원 ",
          props: {
            align: 'right',
          },
        };
      }
    },
    {
      title: '검수일자',
      dataIndex: 'checkDt',
      align: 'center',
      // width: '8%',
      render: (value, record, index) => {
        return {
          children: value,
          props: {
            align: 'center',
          },
        };
      }
    },
    {
      title: '유지보수개시',
      dataIndex: 'mtncStartDt',
      align: 'center',
      // width: '8%',
      render: (value, record, index) => {
        return {
          children: value,
          props: {
            align: 'center',
          },
        };
      }
    },
    {
      title: '유지보수종료',
      dataIndex: 'mtncEndDt',
      align: 'center',
      // width: '8%',
      render: (value, record, index) => {
        return {
          children: value,
          props: {
            align: 'center',
          },
        };
      }
    },

    {
      title: '',
      dataIndex: 'menuTag',
      width: '5%',
      render: (text, record) =>
        (<Dropdown
          overlay={(
            <Menu onClick={(e) => {
              if(e.key==="1"){
              handleMenuClick(record.contId)
              modalBtnHandler()
              }else{
                histShowModal(record.contId)
              }
            }}>
              <Menu.Item key="1">
                상세
            </Menu.Item>

            <Menu.Item key="2">
                히스토리
            </Menu.Item>
            </Menu>
          )}

          placement="bottomLeft">

          <Button size="small"><Icon type="menu" /></Button>
        </Dropdown>
        )
    },
  ];
  // const onSelectChange = selectedRowKeys => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   setSelectedRowKeys(selectedRowKeys)
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }; 

  // const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div style={{ marginLeft: 8, textAlign: 'left' }}>
        {/* {hasSelected ? `${selectedRowKeys.length} 개 선택` : '0 개 선택'} */}
      </div>
      <div className={classes.button}>
        <span style={{ paddingRight: 14 }}>

          <ColorButton
            onClick={showModal}
            className={classes.plusbutton}
            size='small'
            variant="outlined"
            color="primary"
            endIcon={<AddIcon />}
          > 계약 등록
          </ColorButton>
        </span>
        {/* <RemoveButton
          onClick={() => { contDelete(selectedRowKeys); setSelectedRowKeys([]); }}
          className={classes.minusbutton}
          size='small'
          variant="outlined"
          color="secondary"
          endIcon={<RemoveIcon />}
        > 계약 삭제
          </RemoveButton> */}
      </div>

      <Table
        rowKey="contId"
        loading={loadingTable}
        tableLayout='fixed'
        //rowSelection={rowSelection}
        columns={columns}
        rowClassName={(record, index) => {
          console.log("pageNumber",pageInfo.pageNumber,index,index+(10*(pageInfo.pageNumber-1)));
          if (contList[index+(10*(pageInfo.pageNumber-1))].tight){
            return classes.backgroundRed
        }
        }}
        onChange={(pageData) => {
          pageInfo.pageNumber=pageData.current
          console.log("pageData",pageData);
        }}
        dataSource={loadingTable ? null : contList}
        size="small" />
    </div >

  );
}
export default ContTable


