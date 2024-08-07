import supabase from "../lib/db/supabase";
import { Story } from "../models/Story";
import {v4 as uuidv4} from 'uuid';

class StoryService{
  static async getAllStories(): Promise<Story[]> {
    let { data, error } = await supabase.from('Story').select('*');
    if (error) throw error;
    return data as Story[];
}

static async getStoryById(id: string): Promise<Story | null> {
    let { data, error } = await supabase.from('Story').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Story;
}

static async getStoriesByProjectId(projectId: string): Promise<Story[]> {
    let { data, error } = await supabase.from('Story').select('*').eq('projectId', projectId);
    if (error) throw error;
    return data as Story[];
}

static async saveStory(story: Story): Promise<void> {
    
    
    let { error } = await supabase.from('Story').insert([story]);
    if (error) throw error;
    
}

static async updateStory(story: Story): Promise<void> {
    console.log(story);
    let { error } = await supabase.from('Story').update(story).eq('id', story.id);
    if (error) throw error;
    
}

static async deleteStory(id: string): Promise<void> {
    let { error } = await supabase.from('Story').delete().eq('id', id);
    if (error) throw error;
}
}

export const addStory = async (story: Story): Promise<Story> => {
    const { data, error } = await supabase.from('Story').insert([story]).single()

    if (error) {
        console.error('Error adding story:', error)
        throw error
    }

    return data
}
// export const updateStory = async (story: Story): Promise<Story> => {
//     const { data, error } = await supabase
//       .from('Story')
//       .update({
//         name: story.name,
//         description: story.description,
//         priority: story.priority,
//         projectId: story.projectId,
//         status: story.status,
//         ownerId: story.ownerId,
//         createdAt: story.createdAt,
//       })
//       .eq('id', story.id)
//       .single();
  
//     if (error) {
//       throw error;
//     }
//     return data as Story;
//   };

export default StoryService