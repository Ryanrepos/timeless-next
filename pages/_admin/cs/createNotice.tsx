// import React, { useCallback, useEffect, useState } from 'react';
// import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
// import { MenuItem, Select, InputLabel, FormControl, Stack, OutlinedInput } from '@mui/material';
// import withLayoutFull from '../../../libs/components/layout/LayoutFull';
// // import { GET_NOTICE, UPDATE_NOTICE } from '../../../apollo/admin/mutation';
// import { FAQCategory, NoticeCategory } from '../../../libs/enums/notice.enum';
// import { userVar } from '../../../apollo/store';
// import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';
// import { Message } from '../../../libs/enums/common.enum';
// import { useRouter } from 'next/router';
// import { NoticeInput } from '../../../libs/types/cs/csNoticeInput';
// import { GET_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
// import { CREATE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';

// const FaqCreate = ({initialValues, ...props}:any) => {
//     const user = useReactiveVar(userVar);
//     const router = useRouter();
//     const [insertNoticeData, setInsertNoticeData] = useState<NoticeInput>(initialValues);

//     const [createNotice] = useMutation(CREATE_NOTICE_BY_ADMIN);
//     const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
//     const {
// 		loading: getNoticeLoading,
// 		data: getNoticeData,
// 		error: getNoticeError,
// 		refetch:getNoticeRefetch
// 	} = useQuery(GET_NOTICES_BY_ADMIN, {
// 		fetchPolicy:'network-only',
// 		variables:{ input: router.query.id},
//         skip:!router.query.id,
// 	});

//     console.log('data', getNoticeData)
//     useEffect(() => {
//         setInsertNoticeData({
//             ...insertNoticeData,
//             noticeCategory: getNoticeData?.getNotice ?  getNoticeData?.getNotice?.noticeCategory : NoticeCategory.EVENT,
//             faqCategory: getNoticeData?.getNotice ?  getNoticeData?.getNotice?.faqCategory : FAQCategory.OTHER,
//             noticeTitle: getNoticeData?.getNotice ?  getNoticeData?.getNotice?.noticeTitle : '',
//             noticeContent: getNoticeData?.getNotice ?  getNoticeData?.getNotice?.noticeContent : '',
//             noticeEventDate: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeEventDate : '',
//         })
//     }, [getNoticeLoading, getNoticeData]);

//     const createFaqHandler = async () => {
//         try {
//             if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
//             const inputData = {
//                 noticeCategory: insertNoticeData.noticeCategory ? insertNoticeData.noticeCategory : NoticeCategory.FAQ,
//                 faqCategory: insertNoticeData.faqCategory ? insertNoticeData.faqCategory : undefined,
//                 noticeTitle: insertNoticeData.noticeTitle,
//                 noticeContent: insertNoticeData.noticeCategory === NoticeCategory.EVENT ? undefined : insertNoticeData.noticeContent,
//                 noticeEventDate: insertNoticeData.noticeCategory === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : undefined,
//             };
//             await createNotice({ variables: { input: inputData } });
//             setInsertNoticeData({
//                 noticeCategory: NoticeCategory.EVENT,
//                 noticeTitle: '',
//                 noticeContent: '', 
//                 faqCategory: FAQCategory.PRODUCT,
//                 noticeEventDate: '', 
//             });
//             await sweetTopSmallSuccessAlert('Done')
//             await router.back();
//         } catch (err: any) {
//             await sweetErrorHandling(err);
//         }
//     };

//     const updateNoticeHandler = useCallback(async () => {
//         try{
//             //@ts-ignore
//             insertNoticeData._id = getNoticeData?.getNotice?._id;
//             const result = await updateNotice({
//                 variables: {
//                     input: insertNoticeData
//                 }
//             });
//             await sweetTopSmallSuccessAlert('Done');
//             await router.push(`http://localhost:3000/_admin/cs/notice`);
//         }catch(err:any){
// 			await sweetErrorHandling(err).then();
// 		}
//     }, [insertNoticeData]);

//     if (getNoticeLoading) return <p>Loading...</p>;
//     if (getNoticeError) return <p>Error: {getNoticeError.message}</p>;
    
//     const noticeCategory = 'Category';
//     const titleLabel = 
//     insertNoticeData.noticeCategory === NoticeCategory.FAQ ? "Question" :
//     insertNoticeData.noticeCategory === NoticeCategory.TERMS ? "Title" :
//     insertNoticeData.noticeCategory === NoticeCategory.EVENT ? "Event Title": 
//     "Title";

//     const contentLabel = 
//         insertNoticeData.noticeCategory === NoticeCategory.FAQ ? 'Answer' :
//         insertNoticeData.noticeCategory === NoticeCategory.EVENT ? "Input Event Date" :
//         insertNoticeData.noticeCategory === NoticeCategory.TERMS ? "Content" : 
//         "Content"; 
//     return (
//         <div style={{width:'100%', height:'1300px', background:'#a5a4a4', justifyItems:'center'}}>
//             <Stack sx={{ marginTop: '200px', width:'50%' }}>

//             <InputLabel sx={{ color: 'white', marginLeft:'20px', marginBottom:'-5px', fontSize:'22px'}} shrink={true}>{noticeCategory}</InputLabel>
//                 <FormControl fullWidth sx={{ marginBottom: '20px' }}>
//                     <Select
//                         value={insertNoticeData.noticeCategory}
//                         onChange={({ target: { value } }: any) => {
//                             setInsertNoticeData({ 
//                                 ...insertNoticeData, 
//                                 noticeCategory: value,
//                                 noticeContent: value === NoticeCategory.EVENT ? '' : insertNoticeData.noticeContent, 
//                                 noticeEventDate: value === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : '',
//                             });
//                         }}
//                     >
//                         {Object.values(NoticeCategory).map((category) => (
//                             <MenuItem key={category} value={category}>
//                                 {category}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 {insertNoticeData.noticeCategory === NoticeCategory.FAQ && (
//                     <FormControl fullWidth sx={{ marginBottom: '20px' }}>
//                         <InputLabel sx={{ color: 'white', marginLeft:'5px', marginTop:'-7px'}} >Type</InputLabel>
//                         <Select
//                             value={insertNoticeData.faqCategory || ''} 
//                             onChange={({ target: { value } }: any) => {
//                                 setInsertNoticeData({ ...insertNoticeData, faqCategory: value });
//                             }}
//                         >
//                             {Object.values(FAQCategory).map((faqCategory) => (
//                                 <MenuItem key={faqCategory} value={faqCategory}>
//                                     {faqCategory}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 )}
//                  <InputLabel sx={{ color: 'white', marginLeft:'10px', marginBottom:'-5px', fontSize:'22px'}} shrink={true}>{titleLabel}</InputLabel>
//                 <OutlinedInput
//                     label={titleLabel}
//                     onChange={({ target: { value } }: any) => {
//                         setInsertNoticeData({ ...insertNoticeData, noticeTitle: value });
//                     }}
//                     value={insertNoticeData.noticeTitle }
//                     sx={{ marginBottom: '25px', color:'black', background:'#a5a4a4', fontSize:'25px'}}
                   
//                 />
//                  <InputLabel sx={{ color: 'white', marginLeft:'10px', marginBottom:'-5px', fontSize:'22px'}} shrink={true}>{contentLabel}</InputLabel>
//                 <OutlinedInput
//                     label={contentLabel}
//                     onChange={({ target: { value } }: any) => {
//                         if (insertNoticeData.noticeCategory === NoticeCategory.EVENT) {
//                             setInsertNoticeData({ 
//                                 ...insertNoticeData, 
//                                 noticeEventDate: value}) 
//                         } else {
//                             setInsertNoticeData({ ...insertNoticeData, noticeContent: value }); 
//                         }
//                     }}
//                     value={insertNoticeData.noticeEventDate  ?  insertNoticeData.noticeEventDate : insertNoticeData.noticeContent}
//                     sx={{ marginBottom: '25px', color:'black', background:'#a5a4a4', fontSize:'25px' }}
//                 />

//                     <Stack >
// 							{router.query.id ? (
// 								<div style={{
//                                     width:'100px', height:'30px', 
//                                     background:'#1383d9', color:'white',
//                                     justifyItems:'center', alignContent:'center',
//                                     borderRadius:'5px',
//                                     cursor:'pointer'
//                                 }} onClick={updateNoticeHandler}>
// 									<p >Update</p>
// 								</div>
// 							) : (
// 								<div style={{
//                                     width:'100px', height:'30px', 
//                                     background:'#1383d9', color:'white',
//                                     justifyItems:'center', alignContent:'center',
//                                     borderRadius:'5px',
//                                     cursor:'pointer'
//                                 }} onClick={createFaqHandler}>
// 									<p >Create</p>
// 								</div>
// 							)}
// 					</Stack>
//             </Stack>
//         </div>
       
//     );
// };
// FaqCreate.defaultProps ={
//     initialValues: {
//         noticeCategory: '',
//         noticeTitle: '',
//         noticeContent: '', 
//         faqCategory: '',
//         noticeEventDate: '',
//     }
// }

// export default withLayoutFull(FaqCreate);

import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  OutlinedInput,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import withLayoutFull from '../../../libs/components/layout/LayoutFull';
import { FAQCategory, NoticeCategory } from '../../../libs/enums/notice.enum';
import { userVar } from '../../../apollo/store';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';
import { Message } from '../../../libs/enums/common.enum';
import { useRouter } from 'next/router';
import { NoticeInput } from '../../../libs/types/cs/csNoticeInput';
import { GET_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { CREATE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';

const FaqCreate = ({ initialValues, ...props }: any) => {
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const [insertNoticeData, setInsertNoticeData] = useState<NoticeInput>(initialValues);

  const [createNotice] = useMutation(CREATE_NOTICE_BY_ADMIN);
  const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const {
    loading: getNoticeLoading,
    data: getNoticeData,
    error: getNoticeError,
    refetch: getNoticeRefetch
  } = useQuery(GET_NOTICES_BY_ADMIN, {
    fetchPolicy: 'network-only',
    variables: { input: router.query.id },
    skip: !router.query.id,
  });

  useEffect(() => {
    setInsertNoticeData({
      ...insertNoticeData,
      noticeCategory: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeCategory : NoticeCategory.EVENT,
      faqCategory: getNoticeData?.getNotice ? getNoticeData?.getNotice?.faqCategory : FAQCategory.OTHER,
      noticeTitle: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeTitle : '',
      noticeContent: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeContent : '',
      noticeEventDate: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeEventDate : '',
    });
  }, [getNoticeLoading, getNoticeData]);

  const createFaqHandler = async () => {
    try {
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      const inputData = {
        noticeCategory: insertNoticeData.noticeCategory || NoticeCategory.FAQ,
        faqCategory: insertNoticeData.faqCategory || undefined,
        noticeTitle: insertNoticeData.noticeTitle,
        noticeContent: insertNoticeData.noticeCategory === NoticeCategory.EVENT ? undefined : insertNoticeData.noticeContent,
        noticeEventDate: insertNoticeData.noticeCategory === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : undefined,
      };
      await createNotice({ variables: { input: inputData } });
      setInsertNoticeData({
        noticeCategory: NoticeCategory.EVENT,
        noticeTitle: '',
        noticeContent: '',
        faqCategory: FAQCategory.PRODUCT,
        noticeEventDate: '',
      });
      await sweetTopSmallSuccessAlert('Done');
      await router.back();
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  };

  const updateNoticeHandler = useCallback(async () => {
    try {
           //@ts-ignore
      insertNoticeData._id = getNoticeData?.getNotice?._id;
      await updateNotice({ variables: { input: insertNoticeData } });
      await sweetTopSmallSuccessAlert('Done');
      await router.push('/_admin/cs/notice');
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  }, [insertNoticeData]);

  if (getNoticeLoading) return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
  if (getNoticeError) return <Typography color="error">Error: {getNoticeError.message}</Typography>;

  const noticeCategory = 'Category';
  const titleLabel =
    insertNoticeData.noticeCategory === NoticeCategory.FAQ ? "Question" :
    insertNoticeData.noticeCategory === NoticeCategory.TERMS ? "Title" :
    insertNoticeData.noticeCategory === NoticeCategory.EVENT ? "Event Title" :
    "Title";

  const contentLabel =
    insertNoticeData.noticeCategory === NoticeCategory.FAQ ? 'Answer' :
    insertNoticeData.noticeCategory === NoticeCategory.EVENT ? "Enter Date" :
    insertNoticeData.noticeCategory === NoticeCategory.TERMS ? "Content" :
    "Content";

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: '#f4f6f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: 600,
          background: 'white',
          borderRadius: 10,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          {router.query.id ? "Update Notice" : "Create Notice"}
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={insertNoticeData.noticeCategory}
            onChange={({ target: { value } }: any) => {
              setInsertNoticeData({
                ...insertNoticeData,
                noticeCategory: value,
                noticeContent: value === NoticeCategory.EVENT ? '' : insertNoticeData.noticeContent,
                noticeEventDate: value === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : '',
              });
            }}
            sx={{
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            {Object.values(NoticeCategory).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {insertNoticeData.noticeCategory === NoticeCategory.FAQ && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            {/* <InputLabel>Type</InputLabel> */}
            <Select
              value={insertNoticeData.faqCategory || ''}
              onChange={({ target: { value } }: any) => {
                setInsertNoticeData({ ...insertNoticeData, faqCategory: value });
              }}
              sx={{
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              {Object.values(FAQCategory).map((faqCategory) => (
                <MenuItem key={faqCategory} value={faqCategory}>
                  {faqCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{titleLabel}</InputLabel>
          <OutlinedInput
            value={insertNoticeData.noticeTitle}
            onChange={({ target: { value } }: any) => {
              setInsertNoticeData({ ...insertNoticeData, noticeTitle: value });
            }}
            label={titleLabel}
            sx={{
              boxShadow: 1,
              borderRadius: 2,
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{contentLabel}</InputLabel>
          <OutlinedInput
            value={insertNoticeData.noticeEventDate ? insertNoticeData.noticeEventDate : insertNoticeData.noticeContent}
            onChange={({ target: { value } }: any) => {
              if (insertNoticeData.noticeCategory === NoticeCategory.EVENT) {
                setInsertNoticeData({
                  ...insertNoticeData,
                  noticeEventDate: value
                });
              } else {
                setInsertNoticeData({ ...insertNoticeData, noticeContent: value });
              }
            }}
            label={contentLabel}
            sx={{
              boxShadow: 1,
              borderRadius: 2,
            }}
          />
        </FormControl>

        <Button
          variant="contained"
          color="success"
          onClick={router.query.id ? updateNoticeHandler : createFaqHandler}
          fullWidth
          sx={{
            height: 40,
            color: 'white',
            fontWeight: 'normal',
            fontSize: 16,
            textTransform: 'uppercase',
            borderRadius: 10
          }}
        >
          {router.query.id ? "Update" : "Create"}
        </Button>
      </Stack>
    </Box>
  );
};

FaqCreate.defaultProps = {
  initialValues: {
    noticeCategory: '',
    noticeTitle: '',
    noticeContent: '',
    faqCategory: '',
    noticeEventDate: '',
  }
};

export default withLayoutFull(FaqCreate);
