import { config} from "../../index.js";
import mysql2 from "mysql2/promise";

// ===========================================================================


export const register =  async (req, res) => {
    // console.log('hello')
    const pool = await mysql2.createPool(config);
    try {
        const {
          teamName,
          teamSize,
          leaderName,
          leaderEmail,
          leaderPhone,
          members,
          projectIdea,
          pptGoogleDriveUrl,
          preferredTheme,
          videoGoogleDriveUrl
        } = req.body;

        // console.log(members)
    
        if (!teamName || !pptGoogleDriveUrl || !preferredTheme || !videoGoogleDriveUrl || !teamSize || !leaderName || !leaderEmail || !leaderPhone) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Default empty values for members if team size < 4
        const member1 = members[0] || { name: null, email: null, phone: null };
        const member2 = members[1] || { name: null, email: null, phone: null };
        const member3 = members[2] || { name: null, email: null, phone: null };
    
        // SQL Query
        const query = `
          INSERT INTO teams (
            team_name, theme, team_size, ppt_url, demo_video_url, leader_name, leader_email, leader_phone,
            member1_name, member1_email, member1_phone,
            member2_name, member2_email, member2_phone,
            member3_name, member3_email, member3_phone,
            project_idea
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        // Execute Query
        const values = [
          teamName, teamSize, pptGoogleDriveUrl, preferredTheme, videoGoogleDriveUrl, leaderName, leaderEmail, leaderPhone,
          member1.name, member1.email, member1.phone,
          member2.name, member2.email, member2.phone,
          member3.name, member3.email, member3.phone,
          projectIdea || null
        ];
    
        await pool.query(query, values);
    
        return res.status(200).json({message: "Registration successful!"});
      } catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({message: "Internal Server Error" });
      }
}
