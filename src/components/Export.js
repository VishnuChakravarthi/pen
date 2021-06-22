import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactExport from "react-data-export";
import { url } from "./api";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Export = () => {
  const [dataSet1, setDataSet1] = useState();
  const [dataSet2, setDataSet2] = useState();
  const [dataSet3, setDataSet3] = useState();
  const [dataSet4, setDataSet4] = useState();
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const exportFunc = async () => {
      const exportData1 = await Axios.get(`${url}/export`, {
        headers: { Authorization: `Basic ${token}` },
      });
      console.log(exportData1.data.data);
      setDataSet1(exportData1.data.data);
      const exportData2 = await Axios.get(`${url}/export-course`, {
        headers: { Authorization: `Basic ${token}` },
      });
      console.log(exportData2.data.data);
      setDataSet2(exportData2.data.data);
      const exportData3 = await Axios.get(`${url}/export-giventake`, {
        headers: { Authorization: `Basic ${token}` },
      });
      console.log(exportData3.data.data);
      setDataSet3(exportData3.data.data);
      const exportData4 = await Axios.get(`${url}/export-points`, {
        headers: { Authorization: `Basic ${token}` },
      });
      console.log(exportData4.data.data);
      setDataSet4(exportData4.data.data);
    };
    exportFunc();
  }, []);

  console.log(dataSet1);

  return (
    <div>
      {dataSet1 && dataSet2 && dataSet3 && dataSet4 && (
        <ExcelFile element={<button>Download Data</button>}>
          <ExcelSheet data={dataSet1} name="User">
            <ExcelColumn label="User_ID" value="user_id" />
            <ExcelColumn label="User_Name" value="user_name" />
            <ExcelColumn label="Gender" value="sex" />
            <ExcelColumn label="Age" value="age" />
            <ExcelColumn label="Country" value="country" />
            <ExcelColumn label="State" value="" />
            <ExcelColumn label="City" value="" />
            <ExcelColumn
              label="Occupation category"
              value="occupation_category"
            />
            <ExcelColumn label="Organization Name" value="organization_name" />
            <ExcelColumn label="Specify" value="" />
            <ExcelColumn
              label="Profile Completeness Points"
              value="profile_completed_points"
            />
            <ExcelColumn label="Course Category ID" value="category_id" />
            <ExcelColumn label="Course Category Name" value="category_name" />
            <ExcelColumn label="Course ID" value="course_id" />
            <ExcelColumn label="Courses Name" value="course_title" />
            <ExcelColumn label="Course Type" value="course_type" />
            <ExcelColumn label="Skill Level" value="skill_level" />
            <ExcelColumn label="Start date" value="course_start_date" />
            <ExcelColumn label="end date" value="course_end_date" />
            <ExcelColumn label="Course Status" value="course_status" />
            <ExcelColumn
              label="Course paused date"
              value="course_paused_date"
            />
            <ExcelColumn label="Non-returning User" value="" />
            <ExcelColumn label="Assessment scores" value="assessment_score" />
            <ExcelColumn
              label="No. of courses taken so far"
              value="total_courses_taken"
            />
            <ExcelColumn label="Purchase plan" value="purchase_plan" />
            <ExcelColumn label="Course Price" value="course_price" />
            <ExcelColumn label="Points spent" value="points_spent" />
            <ExcelColumn label="Cash paid" value="cash_spent" />
            <ExcelColumn label="Taken topic" value="taken_course" />
            <ExcelColumn
              label="Course performance Badge"
              value="performance_badge"
            />
            <ExcelColumn label="Skills earned" value="skills_earned" />
            <ExcelColumn label="No. of Modules" value="no_of_modules" />
            <ExcelColumn
              label="No. of Modules Completed"
              value="no_of_modules_completed"
            />
            <ExcelColumn label="No. of Assessments" value="no_of_assessments" />
            <ExcelColumn
              label="No. of Assessments Completed"
              value="no_of_assessments_completed"
            />
            <ExcelColumn
              label="Total time spent on course"
              value="total_time_spent_on_course"
            />
            <ExcelColumn
              label="Total time spent on Assesments"
              value="total_time_spent_on_assessment"
            />
            <ExcelColumn label="Consistency Points" value="" />
            <ExcelColumn label="Total Consistency Points" value="" />
            <ExcelColumn label="Referral link" value="referral_code" />
            <ExcelColumn
              label="No. of users logged-in"
              value="no_of_users_logged_in"
            />
            <ExcelColumn
              label="Referral points against this line item"
              value="referral_points"
            />
            <ExcelColumn
              label="Total referral points"
              value="total_referral_points"
            />
            <ExcelColumn
              label="No. of courses in wishlist"
              value="no_of_courses_in_wishlist"
            />
            <ExcelColumn
              label="No. of courses in Cart"
              value="no_of_courses_in_cart"
            />
            <ExcelColumn label="Total Give Points" value="total_give_points" />
            <ExcelColumn label="Total Points earned" value="total_points" />
            <ExcelColumn
              label="Total Points spent"
              value="total_points_spent"
            />
            <ExcelColumn label="Total Cash paid" value="total_cash_paid" />
          </ExcelSheet>

          <ExcelSheet data={dataSet2} name="Courses">
            <ExcelColumn label="Course ID" value="course_id" />
            <ExcelColumn label="Course Name" value="course_title" />
            <ExcelColumn
              label="Course Category ID"
              value="course_category_id"
            />
            <ExcelColumn label="Course Type" value="course_category_name" />
            <ExcelColumn label="Skill Level" value="skill_level" />
            <ExcelColumn label="Course Price" value="course_price" />
            <ExcelColumn label="Purchase Plan" value="purchase_plan" />
            <ExcelColumn label="Skills earned" value="skills_earned" />
            <ExcelColumn label="Course duration" value="course_duration" />
            <ExcelColumn label="No. of Modules" value="no_of_modules" />
            <ExcelColumn
              label="Total No. Assessments"
              value="total_assessments"
            />
            <ExcelColumn label="No. of users" value="no_of_users" />
            <ExcelColumn label="No. of Reviews" value="no_of_reviews" />
            <ExcelColumn label="Avg. Rating" value="average_rating" />
            <ExcelColumn label="Course Status" value="course_status" />
            <ExcelColumn label="Created By" value="modified_by" />
            <ExcelColumn label="Created Date" value="created_date" />
            <ExcelColumn label="Modified Date" value="modified_date" />
            <ExcelColumn label="Modified By" value="modified_by" />
          </ExcelSheet>

          <ExcelSheet data={dataSet3} name="Give and Take">
            <ExcelColumn label="User ID" value="user_id" />
            <ExcelColumn label="User Name" value="user_name" />
            <ExcelColumn label="Given Category" value="given_topic" />
            {/* <ExcelColumn label="Given Course Name" value="given_topic" /> */}

            {/* <ExcelColumn label="Give Category ID" value="given_category_id" /> */}
            {/* <ExcelColumn
              label="Give Category Name"
              value="given_category_name"
            /> */}
            <ExcelColumn label="Give Topic ID" value="given_topic_id" />
            <ExcelColumn label="Given date" value="given_date" />
            <ExcelColumn label="Given points earned" value="given_points" />
            <ExcelColumn
              label="No. of Given Topics"
              value="no_of_given_topics"
            />
            <ExcelColumn label="Total Give Points" value="total_give_points" />
            <ExcelColumn label="Status" value="status" />
          </ExcelSheet>

          <ExcelSheet data={dataSet4} name="Points Analysis">
            <ExcelColumn label="User_ID" value="user_id" />
            <ExcelColumn label="User_Name" value="user_name" />
            <ExcelColumn
              label="Profile Completeness Points"
              value="profile_completed_points"
            />
            <ExcelColumn
              label="Total Consistency Points"
              value="total_consistency_points"
            />
            <ExcelColumn
              label="Total referral points"
              value="total_referral_points"
            />
            <ExcelColumn label="Total Give Points" value="total_given_points" />
            <ExcelColumn
              label="Total Points earned"
              value="total_points_earned"
            />
            <ExcelColumn
              label="Total Points spent"
              value="total_points_spent"
            />
            <ExcelColumn label="Total Cash paid" value="total_cash_paid" />
            <ExcelColumn label="Points_Cash_Ratio" value="points_cash_ratio" />
          </ExcelSheet>
        </ExcelFile>
      )}

      {/* <ExcelFile>
        
        <ExcelSheet data={dataSet2} name="Leaves">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Total Leaves" value="total" />
          <ExcelColumn label="Remaining Leaves" value="remaining" />
        </ExcelSheet>
      </ExcelFile> */}
    </div>
  );
};

export default Export;
