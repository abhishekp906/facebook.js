OrderedFriendsList = function() {
    var a = [];
    var b = {};
    var c = false;
    return copy_properties(new Arbiter, {
        init: function(d) {
            this.init = bagofholding;
            a = d;
            a.forEach(function(f, e) {
                b[f] = e;
            });
            c = true;
            this.inform("initialized", {}, Arbiter.BEHAVIOR_PERSISTENT);
        },
        contains: function(d) {
            return d in b;
        },
        compare: function(d, e) {
            var h = OrderedFriendsList.getRank(d);
            var i = OrderedFriendsList.getRank(e);
            if (h !== i) return h - i;
            var f = ((ChatUserInfos[d] || {}).name || "~").toLowerCase();
            var g = ((ChatUserInfos[e] || {}).name || "~").toLowerCase();
            if (f !== g) return f < g ? -1 : 1;
            return 0;
        },
        getList: function() {
            //This is the only line that was changed from facebook's code.
            //Make sure the list returned only contains user ids from the AvailableList
            return AvailableList.getAvailableIDs();
        },
        getRank: function(d) {
            return d in b ? b[d] : a.length;
        },
        isReady: function() {
            return c;
        }
    });
}();

OrderedFriendsList.init(AvailableList.getAvailableIDs());
//Trigger sidebar refresh
Arbiter.inform('chat/visibility-changed');