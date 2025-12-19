"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, User, Calendar, Filter } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  userEmail: string;
  companyName: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "John Uwimana",
    userEmail: "john@email.com",
    companyName: "EcoWaste Solutions",
    rating: 5,
    comment: "Excellent service! They always come on time and handle waste professionally.",
    date: "2024-01-20",
    status: "approved",
  },
  {
    id: 2,
    userName: "Marie Mukamana",
    userEmail: "marie@email.com",
    companyName: "Green Clean Ltd",
    rating: 4,
    comment: "Good service overall, but sometimes they miss the scheduled pickup time.",
    date: "2024-01-18",
    status: "pending",
  },
  {
    id: 3,
    userName: "David Nkurunziza",
    userEmail: "david@email.com",
    companyName: "Waste Masters",
    rating: 2,
    comment: "Poor service. They often skip our area and don't respond to complaints.",
    date: "2024-01-15",
    status: "approved",
  },
];

export default function UserReviewPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filteredReviews = filter === "all" 
    ? mockReviews 
    : mockReviews.filter(review => review.status === filter);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return variants[status as keyof typeof variants] || "";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getAverageRating = () => {
    const total = mockReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / mockReviews.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Reviews</h1>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Reviews" 
          value={mockReviews.length.toString()} 
          icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
        />
        <StatCard 
          title="Average Rating" 
          value={getAverageRating()} 
          icon={<Star className="w-6 h-6 text-yellow-600" />}
        />
        <StatCard 
          title="Pending Reviews" 
          value={mockReviews.filter(r => r.status === "pending").length.toString()} 
          icon={<Filter className="w-6 h-6 text-yellow-600" />}
        />
        <StatCard 
          title="Approved Reviews" 
          value={mockReviews.filter(r => r.status === "approved").length.toString()} 
          icon={<User className="w-6 h-6 text-green-600" />}
        />
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="p-6 rounded-2xl shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{review.userName}</h3>
                  <p className="text-gray-500 text-sm">{review.userEmail}</p>
                </div>
              </div>
              <Badge className={getStatusBadge(review.status)}>
                {review.status}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Company:</span>
                <span className="text-sm text-gray-600">{review.companyName}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600 ml-1">({review.rating}/5)</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                "{review.comment}"
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(review.date).toLocaleDateString()}
              </div>
              
              {review.status === "pending" && (
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                    Reject
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}