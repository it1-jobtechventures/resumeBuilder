let generalInfo=JSON.parse(localStorage.getItem("generalInfo")) || [];
let socialLinks=JSON.parse(localStorage.getItem("socialLinks")) || [];
let certifications=JSON.parse(localStorage.getItem("certifications")) || [];
let interests=JSON.parse(localStorage.getItem("interests")) || [];
let softwareInfo=JSON.parse(localStorage.getItem("softwareInfo")) || [];
let accomplishments=JSON.parse(localStorage.getItem("accomplishments")) || [];
let volunteering=JSON.parse(localStorage.getItem("volunteering")) || [];
let languages=JSON.parse(localStorage.getItem("languages")) || [];
let skills=JSON.parse(localStorage.getItem("skills")) || [];
let projects=JSON.parse(localStorage.getItem("projects")) || [];
let workExperience=JSON.parse(localStorage.getItem("workExperience")) || [];
let education=JSON.parse(localStorage.getItem("education")) || [];
let internships=JSON.parse((localStorage.getItem("internshipExperience"))) || [];

document.getElementById("name").innerText=generalInfo.firstName+" "+generalInfo.lastName;
document.getElementById("email").innerHTML='<span class="key-heading">email:</span> <a href="mailto:'+generalInfo.email+'" target="_blank">'+generalInfo.email+'</a>';
document.getElementById("telephone").innerHTML="<span class='key-heading'>Phone:</span> "+generalInfo.phone1;



// work experience 

let work_div="";
    
workExperience.forEach((company) => {
    // work_div+="<article>";
    if(company.company!="" && company.company!=null){
        work_div=work_div+'<div class="headingSection"> <h2>'+company.company+'';
        if(company.location!="" && company.location!=null){
            work_div=work_div+'<span>, '+company.location+'</span>';
        }
        work_div+="</h2>";
        if(company.totalCompanyExperience!="" && company.totalCompanyExperience!=null){
            work_div=work_div+'<p class="subHeading">'+company.totalCompanyExperience+' years Experience</p>';
        }

        work_div+="</div>";
        if(company.industry!="" && company.industry!=null){
            work_div=work_div+'<p>'+company.industry+'</p>';
        }
        work_div=work_div+'<div>';
        if(company.roles!="" && company.roles!=null){
            company.roles.forEach((role) => {
                work_div+='<div class="headingSection">';
                if(role.title!="" && role.title!=null){
                    work_div+='<div><h3>'+role.title+'</h3>';
                }
                if(role.jobType!="" && role.jobType!=null){
                    work_div=work_div+'<span>('+role.jobType+'';
                }
                if(role.jobMode!="" && role.jobMode!=null){
                    if(role.jobType!="" && role.jobType!=null ){
                        work_div=work_div+', '+role.jobMode+')';
                    }else{
                        work_div=work_div+'('+role.jobMode+')';

                    }
                }
                work_div=work_div+'</span>';
                work_div+='</div>';
                work_div+='<p class="subHeading">';
                if(role.startDate!="" && role.startDate!=null){
                    work_div=work_div+''+role.startDate;
                    if(role.endDate!="" && role.endDate!=null){
                        work_div=work_div+' to '+role.endDate;
                    }else{
                        work_div=work_div+' to Till Date';
                    }
                }
                work_div+='</p>';
                work_div+='</div>';
                if(role.description!="" && role.description!=null){
                    work_div=work_div+'<p>'+role.description+'</p>';    
                }
                if(role.ctc!="" && role.ctc!=null){
                    work_div=work_div+'<p><span class="key-heading">CTC:</span> ₹'+role.ctc+' P.A.</p>';    
                }
                if(role.noticePeriod!="" && role.noticePeriod!=null){
                    work_div=work_div+'<p><span class="key-heading">Notice Period:</span> '+role.noticePeriod+'</p>';    
                }
                if(role.teamSize!="" && role.teamSize!=null){
                    work_div=work_div+'<p><span class="key-heading">Team Size:</span> '+role.teamSize+'</p>';    
                } 
                
            });
        }
        work_div=work_div+'</div>';                    
    }
    // work_div+="</article>";
    
    
});
if(workExperience.length>0){
    document.getElementById("work-experience-list").innerHTML=work_div;
}else{
    document.querySelector("#work-exp-div").style.display = "none";
}

//internship

/* <article>
    <div class="headingSection">
        <h2>Job Title at Company</h2>
        <p class="subHeading">April 2011 - Present</p>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim. Vestibulum bibendum mattis dignissim. Proin id sapien quis libero interdum porttitor.</p>
</article> */

let intern_div="";
let intern_HTML="";
internships.forEach((internships) => {
    intern_div+='<article> <div class="headingSection">';
    let isTitle=0;
    let isSubTitle=0;
    let isTenure=0;
    if(internships.title!="" && internships.title!=null){
        isTitle=1;
        intern_div+="<h2>"+internships.title+"";
    }
    
    if(internships.company!="" && internships.company!=null){
        if(isTitle==1){
            intern_div+=' | '+internships.company+"</h2>";
        }else{
            isTitle=1;
            intern_div+="<h2>"+internships.company+"</h2>";
        }
    }
    intern_div+='<p class="subHeading">';

    if(internships.startDate!="" && internships.startDate!=null){
        isTenure=1;
        intern_div+='<span> ('+(internships.startDate).split("-").reverse().join("-")+"</span>";
    }
    if(internships.endDate!="" && internships.endDate!=null){
        if(isTenure==1){
            intern_div+='<span> - '+(internships.endDate).split("-").reverse().join("-")+' )</span>';
        }else if(internships.currentlyWorking==true){
            intern_div+='<span>('+(internships.endDate).split("-").reverse().join("-")+' )</span>';
        }        
    }else{
        if(isTenure==1){
            intern_div+='<span> - Till Date )</span>';
        }
    }

    intern_div+='</p>';
    intern_div+='</div>';
    intern_div+='<p>';
    if(internships.internshipType!="" && internships.internshipType!=null){
        isSubTitle=1;
        intern_div+=' <span class="key-heading">'+internships.internshipType+'</span>';
        
    }
    if(internships.internshipMode!="" && internships.internshipMode!=null){
        isSubTitle=1;
        if(isSubTitle==1){
            intern_div+=' ,  <span class="key-heading">'+internships.internshipMode+'</span>';
        }else{
            if(isTitle==1){
                intern_div+=' | <span class="key-heading">'+internships.internshipMode+'</span>';
            }else{
                intern_div+=' <span class="key-heading">'+internships.internshipMode+'</span>';
            }
        }
    }
    intern_div+='</p>';
    if(internships.location!="" && internships.location!=null){
        intern_div+='<p><span class="key-heading">Location:</span> '+internships.location+'</p>';
        
    }
    if(internships.description!="" && internships.description!=null){
        intern_div+='<p> '+internships.description+'</p>';
        
    }
    if(internships.Stipend!="" && internships.Stipend!=null){
        intern_div+='<p><span class="key-heading">Stipend:</span> '+internships.Stipend+'</p>';
        
    }
    if(internships.noticePeriod!="" && internships.noticePeriod!=null){
        intern_div+='<p><span class="key-heading">Notice Period:</span> '+internships.noticePeriod+'</p>';
        
    }
    intern_div+='</article>';

});
if(internships.length>0){
    document.getElementById("internship-experience-list").innerHTML=intern_div;
}else{
    document.querySelector("#internship").style.display = "none";
}




let education_div="";

education.forEach((education) => {
    education_div+='<article>';
    education_div+='<div class="headingSection">';
    let isDegree=0;
    let isSchool=0;

    if(education.degree!="" && education.degree!=null){
        isDegree=1;
        education_div+='<h2>'+education.degree+'';
    }
    if(education.field!="" && education.field!=null && education.field.toLowerCase()!="na"){
        isDegree=1;
        if(isDegree==1){
            education_div+=' in '+education.field+'</h2>';
        }else{
            education_div+='<h2>'+education.field+'</h2>';

        }
    }else{
        education_div+='</h2>';

    }
    if(education.graduationDate!="" && education.graduationDate!=null){
        isDegree=1;
        if(isDegree==1){
            education_div+='<p class="subHeading">'+education.graduationDate+'</p>';
        }else{
            education_div+='<p class="subHeading">'+education.graduationDate+'</p>';
            
        }
    }
    education_div+='</div> <p class="subDetails">';
    if(education.school!="" && education.school!=null){
        isSchool=1;
        education_div+='Studied at '+education.school+'<span>';
    }
    if(education.location!="" && education.location!=null){
        if(isSchool==1){
            education_div+=', <span>'+education.location+'</span>';
        }else{
            education_div+='<span>'+education.location+'</span>';
        }
    }
    education_div+='</p>';
    if(education.cgpa!="" && education.cgpa!=null){
        education_div+='<p><span class="key-heading">CGPA/Percentage: </span>'+education.cgpa+'</p>';
    }
    if(education.Mode!="" && education.Mode!=null){
        education_div+='<p><span class="key-heading">Learning Mode: </span>'+education.Mode+'</p>';
    }
    education_div+='</div>';
});

if(education.length>0){
    document.getElementById("education-list").innerHTML=education_div;
}else{
    document.querySelector("#education").style.display = "none";
}

 //skills

 let skillHTML="";
 skills.forEach((skill) => {
     if(skill.name!="" && skill.name!=null){
         skillHTML=skillHTML+'<li><span>'+skill.name+'</span><div class="sb-skeleton"><div class="skillbar" style="--pgbar-length: '+skill.level+'%"></div></div></li>';
     }

     
 });
 if(skillHTML!=null && skillHTML!=""){
     document.getElementById("skills").innerHTML=skillHTML;
 }else{
     document.querySelector(".pg-skill").style.display = "none";
 }

 //languages

 let languageHTML="";
 languages.forEach((language) => {
     if(language.language!="" && language.level!=null ){
         languageHTML=languageHTML+'<li><span>'+language.language+'</span>  <span>'+language.level+'</span></li>';
     }

     
 });

 if(languageHTML!=null && languageHTML!=""){
     document.getElementById("languages").innerHTML=languageHTML;
 }else{
     document.querySelector(".pg-languages").style.display = "none";
 }

 //certifications

 let certificateHTML="";
 certifications.forEach((certifications) => {
    if(certifications.name!="" && certifications.name!=null ){
         console.log("entered2");
        certificateHTML=certificateHTML+'<li><span>'+certifications.name+'</span></li>';
    }
 });

 if(certificateHTML!=null && certificateHTML!=""){
     document.getElementById("certificates").innerHTML=certificateHTML;
 }else{
     document.querySelector(".pg-certificates").style.display = "none";
 }

 //    interests


 let interestHTML="";
 interests.forEach((interests) => {
     if(interests!="" && interests!=null ){
         interestHTML=interestHTML+'<li><span>'+interests+'</span></li>';
     }

     
 });

 if(interestHTML!=null && interestHTML!=""){
     document.getElementById("interests").innerHTML=interestHTML;
 }else{
     document.querySelector(".pg-interests").style.display = "none";
 }

 //accomplishments

 let accomplishmentsHTML="";
 accomplishments.forEach((accomplishments) => {
     if(accomplishments!="" && accomplishments!=null ){
         accomplishmentsHTML=accomplishmentsHTML+'<li><span>'+accomplishments+'</span></li>';
     }

     
 });

 if(accomplishmentsHTML!=null && accomplishmentsHTML!=""){
     document.getElementById("accomplishments").innerHTML=accomplishmentsHTML;
 }else{
     document.querySelector(".pg-accomplishments").style.display = "none";
 }

 //volunteering

 let volunteeringHTML="";
 volunteering.forEach((volunteering) => {
     if(volunteering!="" && volunteering!=null ){
         volunteeringHTML=volunteeringHTML+'<li><span>'+volunteering+'</span></li>';
     }

     
 });

 if(volunteeringHTML!=null && volunteeringHTML!=""){
     document.getElementById("volunteering").innerHTML=volunteeringHTML;
 }else{
     document.querySelector(".pg-volunteering").style.display = "none";
 }

     //software
     let software_div="";

     softwareInfo.forEach((softwareInfo) => {
         software_div+='<li>';
         if(softwareInfo.name!="" && softwareInfo.name!=null){
             software_div+='<span>'+softwareInfo.name+'</span>';
         }
         if(softwareInfo.rating!="" && softwareInfo.rating!=null){
             if(softwareInfo.rating<=5){
                 software_div+='<div class="sb-skeleton"><div class="skillbar" style="--pgbar-length: '+(softwareInfo.rating*20)+'%"></div></div>';
             }else{
                 software_div+='<div class="sb-skeleton"><div class="skillbar" style="--pgbar-length: '+softwareInfo.rating+'%"></div></div>';
                 
             }
         }
         software_div+='</li>';
     });
     if(softwareInfo.length>0){
         document.getElementById("softwareList").innerHTML=software_div;
     }else{
         document.querySelector(".pg-softwares").style.display = "none";
     }
 
      //projects

    let projects_div="";

    projects.forEach((projects) => {
        projects_div+='<article> <div class="headingSection">';
        

        if(projects.name!="" && projects.name!=null){
            projects_div+='<h2>'+projects.name+'</h2>';
        }

        projects_div+='</div>';
        projects_div+='<div>';
        
        if(projects.summary!="" && projects.summary!=null){
            projects_div+='<p>'+projects.summary+'</p>';
        }
        if(projects.deployedLink!="" && projects.deployedLink!=null){
            projects_div+='<p> <a href="'+projects.deployedLink+'"><span class="key-heading">Project Link:</span> '+projects.deployedLink+'</a></p>';
        }
        if(projects.githubLink!="" && projects.githubLink!=null){
            projects_div+='<p> <a href="'+projects.githubLink+'"><span class="key-heading">github Link:</span> '+projects.githubLink+'</a></p>';
        }

        
        projects_div+='</div>';
        projects_div+='</article>';
    });

    if(projects.length>0){
        document.getElementById("projects-list").innerHTML=projects_div;
    }else{
        document.querySelector("#projects").style.display = "none";
    }
let social_count=0;
    //setting up social links
    if(socialLinks.hasOwnProperty("facebook") && socialLinks.facebook != null){
        document.getElementById("facebook-link").innerHTML = '<a href="'+socialLinks.facebook+'" target="_blank">'+socialLinks.facebook+'</a>';
        social_count++;
    }else{
        document.getElementById("facebookDiv").style.display = "none";
    }
    if(socialLinks.hasOwnProperty("github") && socialLinks.github != null){
        social_count++;
        document.getElementById("github-link").innerHTML = '<a href="'+socialLinks.github+'" target="_blank">'+socialLinks.github+'</a>';
    }else{
        document.getElementById("githubDiv").style.display = "none";
    }
    if(socialLinks.hasOwnProperty("portfolio") && socialLinks.portfolio != null){
        social_count++;
        document.getElementById("portfolio-link").innerHTML = '<a href="'+socialLinks.portfolio+'" target="_blank">'+socialLinks.portfolio+'</a>';
    }else{
        document.getElementById("portfolioDiv").style.display = "none";
    }
    if(socialLinks.hasOwnProperty("instagram") && socialLinks.instagram != null){
        social_count++;
        document.getElementById("instagram-link").innerHTML = '<a href="'+socialLinks.instagram+'" target="_blank">'+socialLinks.instagram+'</a>';
    }else{
        document.getElementById("instagramDiv").style.display = "none";
    }
    if(socialLinks.hasOwnProperty("twitter") && socialLinks.twitter != null){
        social_count++;
        document.getElementById("twitter-link").innerHTML = '<a href="'+socialLinks.twitter+'" target="_blank">'+socialLinks.twitter+'</a>';
    }else{
        document.getElementById("twitterDiv").style.display = "none";
    }
    if(socialLinks.hasOwnProperty("linkedin") && socialLinks.linkedin != null && socialLinks.linkedin != ""){
        social_count++;
        document.getElementById("linkedin-link").innerHTML = '<a href="'+socialLinks.linkedin+'" target="_blank">'+socialLinks.linkedin+'</a>';
        document.getElementById("linkedin").innerHTML = '<span class="key-heading">LinkedIn:</span> '+socialLinks.linkedin;
    }else{
        document.getElementById("linkedin").style.display = "none";
        document.getElementById("linkedinDiv").style.display = "none";
    }

    if(social_count<1){
        document.getElementById("socialDiv").style.display = "none";
    }
    
    if(generalInfo.hasOwnProperty("summary") && generalInfo.summary != null){
        document.getElementById("summary").innerHTML='<p>'+generalInfo.summary+'</p>';
    }else{
        document.getElementById("summaryDiv").style.display = "none";
    }
    if(generalInfo.hasOwnProperty("designation") && generalInfo.designation != null){
        document.getElementById("designation").innerHTML=generalInfo.designation;
    }