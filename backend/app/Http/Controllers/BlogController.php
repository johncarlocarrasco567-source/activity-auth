<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Storage;

class BlogController extends Controller
{
    public function fetchAllBlog(Request $request)
    {
        $blogs = Blog::get();

        return response()->json($blogs);
    }

    public function fetchBlog($id)
    {
        $blog = Blog::where('id', $id)->first();

        return response()->json($blog);
    }

    public function createBlog(Request $request)
    {
        $user_id = $request->user()->id;

        $request->validate([
            'title' => ['required'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png'],
            'description' => ['required'],
        ]);

        $image_url = $request->file('image')->store('blogs', 'public');

        Blog::create([
            'user_id' => $user_id,
            'title' => $request->title,
            'image' => $image_url,
            'description' => $request->description
        ]);

        return response()->json([
            'message' => 'Blog created successfully!'
        ], 200);
    }


    public function destroy($id)
{
    $blog = Blog::find($id);
    
    if (!$blog) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    
    $blog->delete();
    
    return response()->json([
        'message' => 'User deleted successfully'
    ], 200);
}

    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);
        
        if (!$blog) {
            return response()->json([
                'message' => 'Blog not found'
            ], 404);
        }

        // Check if user owns the blog (optional authorization)
        if ($blog->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized to update this blog'
            ], 403);
        }

        $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'image' => ['sometimes', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'description' => ['sometimes', 'required', 'string'],
        ]);

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image
            if ($blog->image && Storage::disk('public')->exists($blog->image)) {
                Storage::disk('public')->delete($blog->image);
            }
            
            // Store new image
            $image_url = $request->file('image')->store('blogs', 'public');
            $blog->image = $image_url;
        }

        // Update other fields
        if ($request->has('title')) {
            $blog->title = $request->title;
        }
        
        if ($request->has('description')) {
            $blog->description = $request->description;
        }

        $blog->save();

        return response()->json([
            'message' => 'Blog updated successfully',
            'data' => $blog
        ], 200);
    }
}
