const ListMaritalStatus = [
    { value: 0, name: 'Độc thân' }, //Single
    { value: 1, name: 'Đính hôn' }, //Engaged
    { value: 2, name: 'Đã kết hôn' }, //Married
    { value: 3, name: 'Ly thân' },//Separated
    { value: 4, name: 'Đã ly hôn' } //Divorced
  ];
  const ListGender = [
    { id: 'M', name: 'Nam' },
    { id: 'F', name: 'Nữ' },
    { id: 'U', name: 'Không rõ' },
  ];
  const ListFamilyRelationship = [
    {value : 0,name : 'Vợ chồng'},
    {value : 1,name : 'Con'},
    {value : 2,name : 'Bố mẹ'},
    {value : 3,name : 'Anh chị em'},
    {value : 4,name : 'Ông bà'},
    {value : 5,name : 'Cháu'},
  ];
  const ListHighSchoolEducation = [
    {value : 1,name : '1/12'},
    {value : 2,name : '2/12'},
    {value : 3,name : '3/12'},
    {value : 4,name : '4/12'},
    {value : 5,name : '5/12'},
    {value : 6,name : '6/12'},
    {value : 7,name : '7/12'},
    {value : 8,name : '8/12'},
    {value : 9,name : '9/12'},
    {value : 10,name : '10/12'},
    {value : 11,name : '11/12'},
    {value : 12,name : '12/12'},
    {value : 13,name : 'Cấp I'},
    {value : 14,name : 'Tốt nghiệp THCS/BTCS'},
    {value : 15,name : 'Tốt nghiệp THPT/BTTH'},
  ];
  const ListCivilServantType =[
    {value : 0,name : 'Công chức hợp đồng'},
    {value : 1,name : 'Công chức được tuyển dụng'}
    
  ]
  const hrmFileFolder = "E:/Data/"
  module.exports = Object.freeze({
    //ROOT_PATH : "/egret/",
    ListGender: ListGender,
    ListMaritalStatus:ListMaritalStatus,
    ListFamilyRelationship:ListFamilyRelationship,
    ListCivilServantType:ListCivilServantType,
    ListHighSchoolEducation:ListHighSchoolEducation,
    hrmFileFolder:hrmFileFolder
  });